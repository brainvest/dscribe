using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class ReportController : ControllerBase
	{
		private readonly IImplementationsContainer _implementationsContainer;
		private readonly IUsersService _usersService;
		private readonly IRichTextDocumentHandler _richTextDocumentHandler;
		private readonly IEntityHandler _entityHandler;

		public ReportController(
			IImplementationsContainer implementationsContainer,
			IUsersService usersService,
			IRichTextDocumentHandler richTextDocumentHandler,
			IEntityHandler entityHandler)
		{
			_implementationsContainer = implementationsContainer;
			_usersService = usersService;
			_richTextDocumentHandler = richTextDocumentHandler;
			_entityHandler = entityHandler;
		}

		public async Task<ActionResult<IEnumerable<ReportsListResponse>>> GetReports()
		{
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var reports = await dbContext.ReportDefinitions
					.Select(x => new ReportsListResponse
					{
						EntityTypeId = x.EntityTypeId,
						ReportFormatId = x.ReportFormatId,
						Id = x.Id,
						Title = x.Title
					}).ToListAsync();
				return reports;
			}
		}

		public async Task<ActionResult> ProcessForDownload(DownloadReportRequest request)
		{
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var report = await dbContext.ReportDefinitions.FindAsync(request.ReportId);
				var (stream, contentType, fileName) = await ProcessReport(report, request.EntityIdentifier);
				return File(stream, contentType, fileName);
			}
		}

		private async Task<(byte[] stream, string contentType, string fileName)> ProcessReport(ReportDefinition report, int entityIdentifier)
		{
			var entityTypeName = _implementationsContainer.Metadata[report.EntityTypeId].Name;
			switch (report.ReportFormatId)
			{
				case ReportFormats.RichTextDocument:
					using (var dbContext = _implementationsContainer.RepositoryFactory())
					{
						var processed = await _richTextDocumentHandler.Process(report.Definition
							, expressions => GetTemplateValues(expressions, entityIdentifier, entityTypeName));
						return (processed, "", $"{report.Title}-{entityTypeName}-{DateTime.Now}");
					}
				default:
					throw new NotImplementedException($"The report format {report.ReportFormatId} is not implemented");
			}
		}

		private async Task<Dictionary<string, string>> GetTemplateValues(IEnumerable<string> expressions, int entityIdentifier, string entityTypeName)
		{
			var request = new ExpressionValueRequest
			{
				EntityTypeName = entityTypeName,
				Ids = new int[] { entityIdentifier },
				Properties = expressions.Select(e => new PropertyInfoModel
				{
					Name = e
				}).ToArray()
			};
			var response = await _entityHandler.GetExpressionValue(request) as ExpressionValueResponse<int>;
			var result = new Dictionary<string, string>();
			foreach (var prop in response.PropertyValues)
			{
				result.Add(prop.Key, prop.Value.FirstOrDefault().Value?.ToString());
			}
			return result;
		}
	}
}