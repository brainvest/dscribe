using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.LobTools.Entities;
using Brainvest.Dscribe.LobTools.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.LobTools.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class CommentController : ControllerBase
	{
		private readonly IImplementationsContainer _implementationsContainer;
		private readonly IUsersService _usersService;

		public CommentController(IImplementationsContainer implementationsContainer, IUsersService usersService)
		{
			_implementationsContainer = implementationsContainer;
			_usersService = usersService;
		}

		public async Task<ActionResult<CommentsListResponse>> GetCommentsList(CommentsListRequest request)
		{
			var entityTypeId = _implementationsContainer.Metadata[request.EntityTypeName].EntityTypeId;
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var attachmets = await dbContext.Comments.Where(x => x.EntityTypeId == entityTypeId && x.Identifier == request.Identifier)
					.Select(x => new CommentsListResponse.Item
					{
						Description = x.Description,
						EntityTypeId = x.EntityTypeId,
						Id = x.Id,
						Identifier = x.Identifier,
						RequestLogId = x.RequestLogId,
						Title = x.Title,
						EntityTypeName = request.EntityTypeName,
					})
					.ToListAsync();
				return new CommentsListResponse
				{
					Items = attachmets
				};
			}
		}

		public async Task<ActionResult<ManageCommentResponse>> AddComment(ManageCommentRequest request)
		{
			var entityTypeId = _implementationsContainer.Metadata[request.EntityTypeName].EntityTypeId;
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var comment = new Comment
				{
					Description = request.Description,
					EntityTypeId = entityTypeId,
					Identifier = request.Identifier,
					RequestLogId = null, //Todo: Fill this after logging is implemented
					Title = request.Title
				};
				await dbContext.AddAsync(comment);
				await dbContext.SaveChangesAsync();
				return new ManageCommentResponse
				{
					Id = comment.Id
				};
			}
		}

		public async Task<ActionResult<ManageCommentResponse>> EditComment(ManageCommentRequest request)
		{
			var entityTypeId = _implementationsContainer.Metadata[request.EntityTypeName].EntityTypeId;
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var comment = await dbContext.Comments.FindAsync(request.Id);
				if (comment.EntityTypeId != entityTypeId || comment.Identifier != request.Identifier)
				{
					ModelState.AddModelError("", "The comment is for another entity. You can't move comments between entities.");
					return BadRequest(ModelState);
				}

				comment.Description = request.Description;
				//Todo: Fill this after logging is implemented RequestLogId = null
				comment.Title = request.Title;
				await dbContext.SaveChangesAsync();
				return new ManageCommentResponse
				{
					Id = comment.Id
				};
			}
		}

		public async Task<ActionResult<ManageCommentResponse>> DeleteComment(ManageCommentRequest request)
		{
			var entityTypeId = _implementationsContainer.Metadata[request.EntityTypeName].EntityTypeId;
			using (var dbContext = _implementationsContainer.LobToolsRepositoryFactory() as LobToolsDbContext)
			{
				var comment = await dbContext.Comments.FindAsync(request.Id);
				dbContext.Remove(comment);
				await dbContext.SaveChangesAsync();
				return new ManageCommentResponse
				{
					Id = comment.Id
				};
			}
		}
	}
}