using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace Brainvest.Dscribe.Security.Entities
{
	public class SecurityDbContext : IdentityDbContext<User, Role, Guid, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
	{
		public SecurityDbContext(DbContextOptions<SecurityDbContext> options)
			: base(options)
		{
		}
	}
}