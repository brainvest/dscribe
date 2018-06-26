using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.MetadataDbAccess
{
	public class EngineDbContext : DbContext
	{
		public EngineDbContext(DbContextOptions<EngineDbContext> options)
			: base(options)
		{

		}

		public DbSet<AppType> AppTypes { get; set; }
		public DbSet<AppInstance> AppInstances { get; set; }

		public DbSet<MetadataRelease> MetadataReleases { get; set; }

		public DbSet<DataType> DataTypes { get; set; }
		public DbSet<EnumType> EnumTypes { get; set; }
		public DbSet<EnumValue> EnumValues { get; set; }
		public DbSet<FacetType> FacetTypes { get; set; }
		public DbSet<PropertyFacetDefaultValue> PropertyFacetDefaultValues { get; set; }
		public DbSet<PropertyFacetDefinition> PropertyFacetDefinitions { get; set; }
		public DbSet<PropertyFacetValue> PropertyFacetValues { get; set; }
		public DbSet<PropertyGeneralUsageCategory> PropertyGeneralUsageCategories { get; set; }
		public DbSet<Property> Properties { get; set; }
		public DbSet<EntityFacetDefaultValue> EntityFacetDefaultValues { get; set; }
		public DbSet<EntityFacetDefinition> EntityFacetDefinitions { get; set; }
		public DbSet<EntityFacetValue> EntityFacetValues { get; set; }
		public DbSet<EntityGeneralUsageCategory> EntityGeneralUsageCategories { get; set; }
		public DbSet<Entity> Entities { get; set; }

		public DbSet<ExpressionDefinition> ExpressionDefinitions { get; set; }
		public DbSet<ExpressionBody> ExpressionBodies { get; set; }

		public DbSet<SavedFilter> SavedFilters { get; set; }
	}
}