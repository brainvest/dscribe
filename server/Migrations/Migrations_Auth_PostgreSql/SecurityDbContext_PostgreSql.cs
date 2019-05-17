using Brainvest.Dscribe.Security.Entities;
using Microsoft.EntityFrameworkCore;

namespace Migrations_Auth_PostgreSql
{
	public class SecurityDbContext_PostgreSql : SecurityDbContext
	{
		public SecurityDbContext_PostgreSql(DbContextOptions<SecurityDbContext_PostgreSql> options) :
			base(options)
		{
		}

	}
}
