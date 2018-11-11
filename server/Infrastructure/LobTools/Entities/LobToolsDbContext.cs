using Microsoft.EntityFrameworkCore;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class LobToolsDbContext : DbContext
	{
		public LobToolsDbContext(DbContextOptions<LobToolsDbContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.HasDefaultSchema("lob");
		}

		public DbSet<Draft> Drafts { get; set; }
		public DbSet<User> Users { get; set; }
	}
}