using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Implementations.Ef.BusinessDataAccess
{
	public static class EFHelper
	{
		public static void PerformMigrations<TDbContext>(TDbContext context)
			where TDbContext : DbContext
		{
			throw new NotImplementedException();
			//new DbMigrator(
			//	new DbMigrationsConfiguration<TDbContext>
			//	{
			//		AutomaticMigrationsEnabled = true,
			//		AutomaticMigrationDataLossAllowed = true, //TODO: This is not a good idea in production code
			//		TargetDatabase = new DbConnectionInfo(context.Database.Connection.ConnectionString, "System.Data.SqlClient") //TODO: This only appliea to sqlserver
			//	}).Update();
		}

		public static void PerformMigrations(Func<DbContext> dbContextFactory)
		{
			using (var context = dbContextFactory())
			{
				typeof(EFHelper).GetMethods()
					.Single(x => x.Name == nameof(PerformMigrations) && x.IsGenericMethodDefinition)
					.MakeGenericMethod(context.GetType()).Invoke(null, new object[] { context });
			}
		}
	}
}