using Brainvest.Dscribe.Abstractions;
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
	public class LobToolsController : ControllerBase
	{
		private readonly IImplementationsContainer _implementationsContainer;
		private readonly IUsersService _usersService;

		public LobToolsController(IImplementationsContainer implementationsContainer, IUsersService usersService)
		{
			_implementationsContainer = implementationsContainer;
			_usersService = usersService;
		}
		[HttpPost]
		public async Task<ActionResult<LobSummaryResponse>> GetSummary(LobSummaryRequest request)
		{
			var entityTypeId = _implementationsContainer.Metadata[request.EntityTypeName].EntityTypeId;
			using (var dbContext = _implementationsContainer.GetLobToolsRepository() as LobToolsDbContext)
			{
				var commentCountTask = dbContext.Comments
					.Where(x => x.EntityTypeId == entityTypeId && request.Identifiers.Contains(x.Identifier))
					.GroupBy(x => x.Identifier)
					.ToDictionaryAsync(g => g.Key, g => g.Count());

				var attachmentCountTask = dbContext.Attachments
					.Where(x => x.EntityTypeId == entityTypeId && request.Identifiers.Contains(x.Identifier))
					.GroupBy(x => x.Identifier)
					.ToDictionaryAsync(g => g.Key, g => g.Count());

				var commentCounts = await commentCountTask;
				var attachmentCounts = await attachmentCountTask;

				var summaries = new Dictionary<int, LobSummaryInfo>();
				foreach (var item in commentCounts)
				{
					summaries.Add(item.Key, new LobSummaryInfo { CommentsCount = item.Value });
				}

				foreach (var item in attachmentCounts)
				{
					if (summaries.TryGetValue(item.Key, out var val))
					{
						val.AttachmentsCount = item.Value;
					}
					else
					{
						summaries.Add(item.Key, new LobSummaryInfo { AttachmentsCount = item.Value });
					}
				}

				return new LobSummaryResponse
				{
					EntityTypeName = request.EntityTypeName,
					Summaries = summaries
				};
			}
		}
	}
}