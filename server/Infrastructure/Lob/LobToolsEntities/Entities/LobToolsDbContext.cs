using Microsoft.EntityFrameworkCore;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class LobToolsDbContext : DbContext
	{
		public LobToolsDbContext(DbContextOptions options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			//modelBuilder.HasDefaultSchema("lob");
		}

		public DbSet<Attachment> Attachments { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<Draft> Drafts { get; set; }
		public DbSet<RequestLog> RequestLogs { get; set; }
		public DbSet<DataLog> DataLogs { get; set; }
	}
}