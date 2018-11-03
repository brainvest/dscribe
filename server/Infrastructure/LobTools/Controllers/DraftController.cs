using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.Controllers
{
	[ApiController]
	public class DraftController : ControllerBase
	{
		private readonly IImplementationsContainer _implementationsContainer;
		private readonly IUsersService _usersService;

		public DraftController(IImplementationsContainer implementationsContainer, IUsersService usersService)
		{
			_implementationsContainer = implementationsContainer;
			_usersService = usersService;
		}

		public async Task<ActionResult<SaveDraftResponse>> SaveDraft(SaveDraftRequest request)
		{
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var draft = new Draft
				{
					ActionTypeId = request.ActionTypeId,
					CreationTime = DateTime.Now,
					EntityTypeId = request.EntityTypeId,
					Identifier = request.Identifier ?? Guid.NewGuid(),
					IsLastVersion = true,
					JsonData = request.JsonData,
					// TODO: The new OwnerUserId can be different from the old one. Is this a problem?
					OwnerUserId = _usersService.GetUserId(User)
				};
				if (request.Identifier.HasValue)
				{
					var lastDraft = await dbContext.Drafts.Where(x => x.Identifier == request.Identifier)
						.OrderByDescending(x => x.Version).FirstOrDefaultAsync();
					draft.Version = lastDraft.Version + 1;
					lastDraft.IsLastVersion = false;
				}
				else
				{
					draft.Version = 1;
				}
				dbContext.Drafts.Add(draft);
				await dbContext.SaveChangesAsync();
				return new SaveDraftResponse
				{
					Identifier = draft.Identifier,
					Version = draft.Version
				};
			}
		}

		public async Task<ActionResult<DraftsListResponse>> GetDraftsList(DraftsListRequest request)
		{
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var query = dbContext.Drafts.Where(x => x.IsLastVersion);
				if (request.ActionTypeId.HasValue)
				{
					query = query.Where(x => x.ActionTypeId == request.ActionTypeId);
				}
				if (request.EntityTypeId.HasValue)
				{
					query = query.Where(x => x.EntityTypeId == request.EntityTypeId);
				}
				if (request.ShowOtherUsersDrafts)
				{
					if (request.OwnerUserId.HasValue)
					{
						query = query.Where(x => x.OwnerUserId == request.OwnerUserId);
					}
				}
				else
				{
					var userId = _usersService.GetUserId(User);
					query = query.Where(x => x.OwnerUserId == userId);
				}
				var totalCount = query.CountAsync();
				var drafts = query.OrderByDescending(x => x.CreationTime).Skip(request.StartIndex).Take(request.Count)
					.Select(x => new DraftsListResponse.Item
					{
						ActionTypeId = x.ActionTypeId,
						CreationTime = x.CreationTime,
						EntityTypeId = x.EntityTypeId,
						Identifier = x.Identifier,
						Version = x.Version,
						JsonData = x.JsonData,
						OwnerUserId = x.OwnerUserId
					}).ToListAsync();

				return new DraftsListResponse
				{
					Items = await drafts,
					TotalCount = await totalCount
				};
			}
		}
	}
}