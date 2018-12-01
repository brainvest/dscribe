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
	}
}