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
	public class AttachmentController : ControllerBase
	{
		private readonly IImplementationsContainer _implementationsContainer;
		private readonly IUsersService _usersService;

		public AttachmentController(IImplementationsContainer implementationsContainer, IUsersService usersService)
		{
			_implementationsContainer = implementationsContainer;
			_usersService = usersService;
		}

		public async Task<ActionResult<AttachmentsListResponse>> GetAttachmentsList(AttachmentsListRequest request)
		{
			var entityTypeId = _implementationsContainer.Metadata[request.EntityTypeName].EntityTypeId;
			using (var dbContext = _implementationsContainer.GetLobToolsRepository() as LobToolsDbContext)
			{
				var attachmets = await dbContext.Attachments.Where(x => x.EntityTypeId == entityTypeId && x.Identifier == request.Identifier)
					.Select(x => new AttachmentsListResponse.Item
					{
						Description = x.Description,
						EntityTypeId = x.EntityTypeId,
						Id = x.Id,
						Identifier = x.Identifier,
						IsDeleted = x.IsDeleted,
						Title = x.Title,
						Url = x.Url,
						FileName = x.FileName,
						Size = x.Size
					})
					.ToListAsync();
				return new AttachmentsListResponse
				{
					Items = attachmets
				};
			}
		}

		public async Task<ActionResult> Download(DownloadAttachmentRequest request)
		{
			using (var dbContext = _implementationsContainer.GetLobToolsRepository() as LobToolsDbContext)
			{
				var attachment = await dbContext.Attachments.FindAsync(request.Id);
				HttpContext.Response.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
				return File(attachment.Data, "application/octet-stream", attachment.FileName);
			}
		}
	}
}