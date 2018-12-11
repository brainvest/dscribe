using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.Models;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities.Reporting;
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
		private readonly MetadataDbContext _metadataDbContext;

		public ReportController(
			IImplementationsContainer implementationsContainer,
			IUsersService usersService,
			IRichTextDocumentHandler richTextDocumentHandler,
			IEntityHandler entityHandler,
			MetadataDbContext metadataDbContext)
		{
			_implementationsContainer = implementationsContainer;
			_usersService = usersService;
			_richTextDocumentHandler = richTextDocumentHandler;
			_entityHandler = entityHandler;
			_metadataDbContext = metadataDbContext;
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<ReportsListResponse>>> GetReports()
		{
			var reports = await _metadataDbContext.ReportDefinitions
				.Select(x => new
				{
					x.EntityTypeId,
					x.ReportFormatId,
					x.Id,
					x.Title
				}).ToListAsync();
			return reports.Select(x => new ReportsListResponse
			{
				EntityTypeName = _implementationsContainer.Metadata[x.EntityTypeId].Name,
				Format = x.ReportFormatId,
				Id = x.Id,
				Title = x.Title
			}).ToList();
		}

		[HttpPost]
		public async Task<ActionResult> ProcessForDownload(DownloadReportRequest request)
		{
			var report = await _metadataDbContext.ReportDefinitions.FindAsync(request.ReportDefinitionId);
			var (bytes, contentType, fileName) = await ProcessReport(report, request.EntityIdentifier);
			HttpContext.Response.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
			return File(bytes, contentType, fileName);
		}

		[HttpPost]
		public async Task<ActionResult> SaveAsAttachment(SaveReportAsAttachmentRequest request)
		{
			var report = await _metadataDbContext.ReportDefinitions.FindAsync(request.ReportDefinitionId);
			var (bytes, contentType, fileName) = await ProcessReport(report, request.EntityIdentifier);
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var attachment = new Attachment
				{
					Data = bytes,
					Description = request.Description,
					EntityTypeId = report.EntityTypeId,
					Identifier = request.EntityIdentifier,
					Title = request.Title
				};
				await dbContext.AddAsync(attachment);
				await dbContext.SaveChangesAsync();
			}
			return Ok();
		}

		private async Task<(byte[] bytes, string contentType, string fileName)> ProcessReport(ReportDefinition report, int entityIdentifier)
		{
			var entityTypeName = _implementationsContainer.Metadata[report.EntityTypeId].Name;
			switch (report.ReportFormatId)
			{
				case ReportFormats.RichTextDocument:
					using (var dbContext = _implementationsContainer.RepositoryFactory())
					{
						var processed = await _richTextDocumentHandler.Process(report.Definition
							, expressions => GetTemplateValues(expressions, entityIdentifier, entityTypeName));
						return (processed, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
							, $"{report.Title}-{entityTypeName}-{DateTime.Now.ToString("yyyyMMddHHmmss")}.docx");
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