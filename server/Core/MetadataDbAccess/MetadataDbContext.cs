using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Brainvest.Dscribe.MetadataDbAccess.Entities.Security;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Brainvest.Dscribe.MetadataDbAccess
{
	public class MetadataDbContext : DbContext
	{
		public MetadataDbContext(DbContextOptions<MetadataDbContext> options)
			: base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			foreach (var relationship in modelBuilder.Model.GetEntityTypes()
				.SelectMany(e => e.GetForeignKeys()))
			{
				relationship.DeleteBehavior = DeleteBehavior.Restrict;
			}

			#region indexes
			modelBuilder.Entity<AppInstance>().HasIndex(x => x.Name).IsUnique();
			modelBuilder.Entity<AppInstance>().HasIndex(x => x.Title).IsUnique();
			modelBuilder.Entity<AppType>().HasIndex(x => x.Name).IsUnique();
			modelBuilder.Entity<AppType>().HasIndex(x => x.Title).IsUnique();
			modelBuilder.Entity<Entity>().HasIndex(x => new { x.AppTypeId, x.Name }).IsUnique();
			modelBuilder.Entity<ExpressionDefinition>().HasIndex(x => new { x.AppTypeId, x.Identifier }).IsUnique();
			modelBuilder.Entity<Property>().HasIndex(x => new { x.EntityId, x.Name }).IsUnique();
			#endregion

			#region data
			modelBuilder.Entity<DataType>().HasData(
				new DataType { Id = DataTypeEnum.Int, Name = "Integer", ClrType = "System.Int32", Identifier = "int", IsValueType = true },
				new DataType { Id = DataTypeEnum.String, Name = "String", ClrType = "System.String", Identifier = "string", IsValueType = false },
				new DataType { Id = DataTypeEnum.Bool, Name = "Boolean", ClrType = "System.Boolean", Identifier = "bool", IsValueType = true },
				new DataType { Id = DataTypeEnum.Date, Name = "Date", ClrType = "System.DateTime", Identifier = "Date", IsValueType = true },
				new DataType { Id = DataTypeEnum.Time, Name = "Time Of Day", ClrType = "System.TimeSpan", Identifier = "Time", IsValueType = true },
				new DataType { Id = DataTypeEnum.DateTime, Name = "Date and Time", ClrType = "System.DateTime", Identifier = "DateTime", IsValueType = true },
				new DataType { Id = DataTypeEnum.ForeignKey, Name = "Foreign Key", ClrType = null, Identifier = "ForeignKey", IsValueType = true },
				new DataType { Id = DataTypeEnum.NavigationEntity, Name = "Navigation Property", ClrType = null, Identifier = "NavigationEntity", IsValueType = false },
				new DataType { Id = DataTypeEnum.Enum, Name = "Enum", ClrType = null, Identifier = "Enum", IsValueType = true },
				new DataType { Id = DataTypeEnum.NavigationList, Name = "Navigation List", ClrType = null, Identifier = "NavigationList", IsValueType = false },
				new DataType { Id = DataTypeEnum.Guid, Name = "Guid", ClrType = "System.Guid", Identifier = "Guid", IsValueType = true },
				new DataType { Id = DataTypeEnum.Decimal, Name = "Decimal", ClrType = "System.Decimal", Identifier = "decimal", IsValueType = true },
				new DataType { Id = DataTypeEnum.LongInteger, Name = "Long Integer", ClrType = "System.Int64", Identifier = "long", IsValueType = true },
				new DataType { Id = DataTypeEnum.ShortInteger, Name = "Short Integer", ClrType = "System.Int16", Identifier = "short", IsValueType = true },
				new DataType { Id = DataTypeEnum.TinyInteger, Name = "Tiny Integer", ClrType = "System.Byte", Identifier = "byte", IsValueType = true },
				new DataType { Id = DataTypeEnum.Double, Name = "Double", ClrType = "System.Double", Identifier = "double", IsValueType = true }
			);
			modelBuilder.Entity<ExpressionFormat>().HasData(
				new ExpressionFormat { Id = ExpressionFormatEnum.SimplePath, Identifier = "SimplePath", Title = "Simple Path" },
				new ExpressionFormat { Id = ExpressionFormatEnum.Json, Identifier = "Json", Title = "Json" },
				new ExpressionFormat { Id = ExpressionFormatEnum.CSharp, Identifier = "C#", Title = "C#" }
			);
			modelBuilder.Entity<EntityGeneralUsageCategory>().HasData(
				new EntityGeneralUsageCategory { Id = 1, Name = "WorkingData" },
				new EntityGeneralUsageCategory { Id = 2, Name = "BasicInfo" }
			);
			modelBuilder.Entity<FacetType>().HasData(
				new FacetType { Id = FacetDataType.Bool, Identifier = "bool", Name = "Boolean" },
				new FacetType { Id = FacetDataType.Int, Identifier = "int", Name = "Integer" },
				new FacetType { Id = FacetDataType.String, Identifier = "string", Name = "String" }
			);
			modelBuilder.Entity<PropertyFacetDefinition>().HasData(
				new PropertyFacetDefinition { Id = 1, Name = "HideInInsert", FacetTypeId = FacetDataType.Bool },
				new PropertyFacetDefinition { Id = 2, Name = "HideInEdit", FacetTypeId = FacetDataType.Bool },
				new PropertyFacetDefinition { Id = 3, Name = "IsRequired", FacetTypeId = FacetDataType.Bool },
				new PropertyFacetDefinition { Id = 4, Name = "HideInList", FacetTypeId = FacetDataType.Bool },
				new PropertyFacetDefinition { Id = 5, Name = "ReadOnlyInEdit", FacetTypeId = FacetDataType.Bool }
			);
			modelBuilder.Entity<PropertyGeneralUsageCategory>().HasData(
				new PropertyGeneralUsageCategory { Id = 1, Name = "NormalData" },
				new PropertyGeneralUsageCategory { Id = 2, Name = "PrimaryKey" },
				new PropertyGeneralUsageCategory { Id = 3, Name = "ForeignKey" },
				new PropertyGeneralUsageCategory { Id = 4, Name = "NavigationProperty" },
				new PropertyGeneralUsageCategory { Id = 5, Name = "NavigationList" }
			);
			modelBuilder.Entity<EntityActionType>().HasData(
				new EntityActionType { Id = ActionTypeEnum.GetMetadata, Name = "GetMetadata" },
				new EntityActionType { Id = ActionTypeEnum.Select, Name = "Select" },
				new EntityActionType { Id = ActionTypeEnum.Insert, Name = "Insert" },
				new EntityActionType { Id = ActionTypeEnum.Delete, Name = "Delete" },
				new EntityActionType { Id = ActionTypeEnum.Update, Name = "Update" },
				new EntityActionType { Id = ActionTypeEnum.ManageMetadata, Name = "ManageMetadata" },
				new EntityActionType { Id = ActionTypeEnum.CustomNamedAction, Name = "CustomNamedAction" }
			);

			modelBuilder.Entity<Role>().HasData(
				new Role { Id = Guid.Parse("2E17424D-9A7C-44EE-962E-0A0E12176CFF"), Name = "Anonymous" },
				new Role { Id = Guid.Parse("7555DD25-EE7F-4A21-9156-3867DCBCED77"), Name = "Admin" }
			);

			modelBuilder.Entity<Permission>().HasData(
				new Permission { Id = 1, RoleId = Guid.Parse("7555DD25-EE7F-4A21-9156-3867DCBCED77"), PermissionType = PermissionType.Allow }
			);

			#endregion
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
		public DbSet<ExpressionFormat> ExpressionFormats { get; set; }

		public DbSet<SavedFilter> SavedFilters { get; set; }

		public DbSet<User> Users { get; set; }
		public DbSet<Role> Roles { get; set; }
		public DbSet<EntityActionType> EntityActionTypes { get; set; }
		public DbSet<Permission> Permissions { get; set; }

	}
}