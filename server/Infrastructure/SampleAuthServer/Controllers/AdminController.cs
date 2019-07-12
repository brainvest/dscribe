using Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;
using Brainvest.Dscribe.Security.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Controllers
{
	[ApiController]
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	[Authorize(Roles = "Admin, Manager")]
	public class AdminController : ControllerBase
	{
		SecurityDbContext _securityDbContext;
		public AdminController(SecurityDbContext securityDbContext)
		{
			_securityDbContext = securityDbContext;
		}

		public async Task<IEnumerable<UserModel>> GetUsers()
		{
			var users = await _securityDbContext.Users.Select(x => new UserModel
			{
				Email = x.Email,
				Id = x.Id,
				UserName = x.UserName
			}).ToListAsync();
			return users;
		}

		public async Task<IEnumerable<RoleModel>> GetRoles()
		{
			var roles = await _securityDbContext.Roles.Select(x => new RoleModel
			{
				Id = x.Id,
				Name = x.Name
			}).ToListAsync();
			return roles;
		}

		public async Task<IEnumerable<UserRoleModel>> GetUserRoles()
		{
			var userRoles = await _securityDbContext.UserRoles.Select(x => new UserRoleModel
			{
				UserId = x.UserId,
				RoleId = x.RoleId
			}).ToListAsync();
			return userRoles;
		}

		public async Task<bool> UpdateUserRoles(IEnumerable<UserRoleModel> newValues)
		{
			var existing = await _securityDbContext.UserRoles.ToListAsync();
			foreach (var e in existing)
			{
				if (!newValues.Any(x => x.RoleId == e.RoleId && x.UserId == e.UserId))
				{
					_securityDbContext.UserRoles.Remove(e);
				}
			}
			foreach (var x in newValues)
			{
				if (!existing.Any(e => x.RoleId == e.RoleId && x.UserId == e.UserId))
				{
					_securityDbContext.UserRoles.Add(new UserRole
					{
						RoleId = x.RoleId,
						UserId = x.UserId
					});
				}
			}
			try
			{
				await _securityDbContext.SaveChangesAsync();
			}
			catch
			{
				return false;
			}
			return true;
		}
	}
}