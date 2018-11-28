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

		public DbSet<Attachment> Attachments { get; set; }
		public DbSet<Draft> Drafts { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<ReportDefinition> ReportDefinitions { get; set; }
		public DbSet<ReportFormat> ReportFormats { get; set; }
	}
}