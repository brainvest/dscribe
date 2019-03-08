using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Brainvest.Dscribe.MetadataDbAccess.Migrations
{
    public partial class Initialize_Metadata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    Title = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DatabaseProviders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DatabaseProviders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DataTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", nullable: true),
                    Identifier = table.Column<string>(maxLength: 200, nullable: true),
                    ClrType = table.Column<string>(nullable: true),
                    IsValueType = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EntityActionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityActionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EntityTypeGeneralUsageCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypeGeneralUsageCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EnumTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Identifier = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnumTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExpressionFormats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Identifier = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpressionFormats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FacetTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Identifier = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacetTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PropertyGeneralUsageCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyGeneralUsageCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReportFormats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportFormats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MetadataReleases",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Version = table.Column<string>(type: "varchar(200)", nullable: true),
                    VersionCode = table.Column<int>(nullable: true),
                    AppTypeId = table.Column<int>(nullable: false),
                    ReleaseTime = table.Column<DateTime>(nullable: false),
                    CreatedByUserId = table.Column<int>(nullable: false),
                    MetadataSnapshot = table.Column<byte[]>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetadataReleases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetadataReleases_AppTypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "AppTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AppTypeId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", nullable: true),
                    TableName = table.Column<string>(nullable: true),
                    SchemaName = table.Column<string>(nullable: true),
                    SingularTitle = table.Column<string>(nullable: true),
                    PluralTitle = table.Column<string>(nullable: true),
                    GeneralUsageCategoryId = table.Column<int>(nullable: false),
                    BaseEntityTypeId = table.Column<int>(nullable: true),
                    DisplayNamePath = table.Column<string>(nullable: true),
                    CodePath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityTypes_AppTypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "AppTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityTypes_EntityTypes_BaseEntityTypeId",
                        column: x => x.BaseEntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityTypes_EntityTypeGeneralUsageCategories_GeneralUsageCategoryId",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "EntityTypeGeneralUsageCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EnumValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EnumTypeId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Identifier = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnumValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnumValues_EnumTypes_EnumTypeId",
                        column: x => x.EnumTypeId,
                        principalTable: "EnumTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityTypeFacetDefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    FacetTypeId = table.Column<int>(nullable: false),
                    EnumTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypeFacetDefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetDefinitions_EnumTypes_EnumTypeId",
                        column: x => x.EnumTypeId,
                        principalTable: "EnumTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetDefinitions_FacetTypes_FacetTypeId",
                        column: x => x.FacetTypeId,
                        principalTable: "FacetTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PropertyFacetDefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    FacetTypeId = table.Column<int>(nullable: false),
                    EnumTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyFacetDefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyFacetDefinitions_EnumTypes_EnumTypeId",
                        column: x => x.EnumTypeId,
                        principalTable: "EnumTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PropertyFacetDefinitions_FacetTypes_FacetTypeId",
                        column: x => x.FacetTypeId,
                        principalTable: "FacetTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppInstances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AppTypeId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", nullable: false),
                    Title = table.Column<string>(maxLength: 200, nullable: false),
                    IsProduction = table.Column<bool>(nullable: false),
                    DatabaseProviderId = table.Column<int>(nullable: false),
                    DataConnectionString = table.Column<string>(nullable: false),
                    LobConnectionString = table.Column<string>(nullable: true),
                    IsEnabled = table.Column<bool>(nullable: false),
                    UseUnreleasedMetadata = table.Column<bool>(nullable: false),
                    MigrateDatabase = table.Column<bool>(nullable: false),
                    GeneratedCodeNamespace = table.Column<string>(nullable: true),
                    MetadataReleaseId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppInstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppInstances_AppTypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "AppTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInstances_DatabaseProviders_DatabaseProviderId",
                        column: x => x.DatabaseProviderId,
                        principalTable: "DatabaseProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInstances_MetadataReleases_MetadataReleaseId",
                        column: x => x.MetadataReleaseId,
                        principalTable: "MetadataReleases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReportDefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<int>(nullable: false),
                    ReportFormatId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Definition = table.Column<byte[]>(nullable: true),
                    DefinitionUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportDefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReportDefinitions_EntityTypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReportDefinitions_ReportFormats_ReportFormatId",
                        column: x => x.ReportFormatId,
                        principalTable: "ReportFormats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SavedFilters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    InputEntityTypeId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: false),
                    Body = table.Column<string>(nullable: false),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedFilters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedFilters_EntityTypes_InputEntityTypeId",
                        column: x => x.InputEntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityTypeFacetValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<int>(nullable: false),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypeFacetValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetValues_EntityTypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetValues_EntityTypeFacetDefinitions_FacetDefinitionId",
                        column: x => x.FacetDefinitionId,
                        principalTable: "EntityTypeFacetDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EntityTypeFacetDefaultValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    GeneralUsageCategoryId = table.Column<int>(nullable: false),
                    AppTypeId = table.Column<int>(nullable: true),
                    AppInstanceId = table.Column<int>(nullable: true),
                    DefaultValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypeFacetDefaultValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetDefaultValues_AppInstances_AppInstanceId",
                        column: x => x.AppInstanceId,
                        principalTable: "AppInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetDefaultValues_AppTypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "AppTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetDefaultValues_EntityTypeFacetDefinitions_FacetDefinitionId",
                        column: x => x.FacetDefinitionId,
                        principalTable: "EntityTypeFacetDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EntityTypeFacetDefaultValues_EntityTypeGeneralUsageCategories_GeneralUsageCategoryId",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "EntityTypeGeneralUsageCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<int>(nullable: true),
                    RoleId = table.Column<Guid>(nullable: true),
                    UserId = table.Column<Guid>(nullable: true),
                    ActionTypeId = table.Column<int>(nullable: true),
                    ActionName = table.Column<string>(type: "varchar(200)", nullable: true),
                    AppInstanceId = table.Column<int>(nullable: true),
                    PermissionType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Permissions_EntityActionTypes_ActionTypeId",
                        column: x => x.ActionTypeId,
                        principalTable: "EntityActionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permissions_AppInstances_AppInstanceId",
                        column: x => x.AppInstanceId,
                        principalTable: "AppInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permissions_EntityTypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permissions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PropertyFacetDefaultValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    GeneralUsageCategoryId = table.Column<int>(nullable: false),
                    AppTypeId = table.Column<int>(nullable: true),
                    AppInstanceId = table.Column<int>(nullable: true),
                    DefaultValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyFacetDefaultValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyFacetDefaultValues_AppInstances_AppInstanceId",
                        column: x => x.AppInstanceId,
                        principalTable: "AppInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PropertyFacetDefaultValues_AppTypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "AppTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PropertyFacetDefaultValues_PropertyFacetDefinitions_FacetDefinitionId",
                        column: x => x.FacetDefinitionId,
                        principalTable: "PropertyFacetDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PropertyFacetDefaultValues_PropertyGeneralUsageCategories_GeneralUsageCategoryId",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "PropertyGeneralUsageCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExpressionDefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AppTypeId = table.Column<int>(nullable: false),
                    Identifier = table.Column<string>(type: "varchar(200)", nullable: false),
                    ShortDescription = table.Column<string>(nullable: false),
                    LongDescription = table.Column<string>(nullable: true),
                    MainInputEntityTypeId = table.Column<int>(nullable: false),
                    ActiveBodyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpressionDefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpressionDefinitions_AppTypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "AppTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExpressionDefinitions_EntityTypes_MainInputEntityTypeId",
                        column: x => x.MainInputEntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExpressionBodies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DefinitionId = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    InvalidationTime = table.Column<DateTime>(nullable: true),
                    Comments = table.Column<string>(nullable: true),
                    FormatId = table.Column<int>(nullable: false),
                    Body = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpressionBodies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpressionBodies_ExpressionDefinitions_DefinitionId",
                        column: x => x.DefinitionId,
                        principalTable: "ExpressionDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExpressionBodies_ExpressionFormats_FormatId",
                        column: x => x.FormatId,
                        principalTable: "ExpressionFormats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OwnerEntityTypeId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(type: "varchar(200)", nullable: true),
                    Title = table.Column<string>(nullable: true),
                    GeneralUsageCategoryId = table.Column<int>(nullable: false),
                    DataTypeId = table.Column<int>(nullable: true),
                    IsExpression = table.Column<bool>(nullable: false),
                    ExpressionDefinitionId = table.Column<int>(nullable: true),
                    DataEntityTypeId = table.Column<int>(nullable: true),
                    IsNullable = table.Column<bool>(nullable: false),
                    ForeignKeyPropertyId = table.Column<int>(nullable: true),
                    InversePropertyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Properties_EntityTypes_DataEntityTypeId",
                        column: x => x.DataEntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Properties_DataTypes_DataTypeId",
                        column: x => x.DataTypeId,
                        principalTable: "DataTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Properties_ExpressionDefinitions_ExpressionDefinitionId",
                        column: x => x.ExpressionDefinitionId,
                        principalTable: "ExpressionDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Properties_Properties_ForeignKeyPropertyId",
                        column: x => x.ForeignKeyPropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Properties_PropertyGeneralUsageCategories_GeneralUsageCategoryId",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "PropertyGeneralUsageCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Properties_Properties_InversePropertyId",
                        column: x => x.InversePropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Properties_EntityTypes_OwnerEntityTypeId",
                        column: x => x.OwnerEntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PropertyFacetValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
												.Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PropertyId = table.Column<int>(nullable: false),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyFacetValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyFacetValues_PropertyFacetDefinitions_FacetDefinitionId",
                        column: x => x.FacetDefinitionId,
                        principalTable: "PropertyFacetDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PropertyFacetValues_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "DataTypes",
                columns: new[] { "Id", "ClrType", "Identifier", "IsValueType", "Name" },
                values: new object[,]
                {
                    { 1, "System.Int32", "int", true, "Integer" },
                    { 16, "System.Double", "double", true, "Double" },
                    { 15, "System.Byte", "byte", true, "Tiny Integer" },
                    { 14, "System.Int16", "short", true, "Short Integer" },
                    { 13, "System.Int64", "long", true, "Long Integer" },
                    { 12, "System.Decimal", "decimal", true, "Decimal" },
                    { 10, null, "NavigationList", false, "Navigation List" },
                    { 9, null, "Enum", true, "Enum" },
                    { 11, "System.Guid", "Guid", true, "Guid" },
                    { 7, null, "ForeignKey", true, "Foreign Key" },
                    { 6, "System.DateTime", "DateTime", true, "Date and Time" },
                    { 5, "System.TimeSpan", "Time", true, "Time Of Day" },
                    { 4, "System.DateTime", "Date", true, "Date" },
                    { 3, "System.Boolean", "bool", true, "Boolean" },
                    { 2, "System.String", "string", false, "String" },
                    { 8, null, "NavigationEntity", false, "Navigation Property" }
                });

            migrationBuilder.InsertData(
                table: "DatabaseProviders",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "MySql" },
                    { 2, "SqlServer" }
                });

            migrationBuilder.InsertData(
                table: "EntityActionTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 6, "ManageMetadata" },
                    { 7, "CustomNamedAction" },
                    { 5, "Update" },
                    { 3, "Insert" },
                    { 2, "Select" },
                    { 1, "GetMetadata" },
                    { 4, "Delete" }
                });

            migrationBuilder.InsertData(
                table: "EntityTypeGeneralUsageCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "WorkingData" },
                    { 2, "BasicInfo" },
                    { 3, "Model" }
                });

            migrationBuilder.InsertData(
                table: "ExpressionFormats",
                columns: new[] { "Id", "Identifier", "Title" },
                values: new object[,]
                {
                    { 3, "C#", "C#" },
                    { 1, "SimplePath", "Simple Path" },
                    { 2, "Json", "Json" }
                });

            migrationBuilder.InsertData(
                table: "FacetTypes",
                columns: new[] { "Id", "Identifier", "Name" },
                values: new object[,]
                {
                    { 3, "string", "String" },
                    { 1, "bool", "Boolean" },
                    { 2, "int", "Integer" }
                });

            migrationBuilder.InsertData(
                table: "PropertyGeneralUsageCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 4, "NavigationProperty" },
                    { 1, "NormalData" },
                    { 2, "PrimaryKey" },
                    { 3, "ForeignKey" },
                    { 5, "NavigationList" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("2e17424d-9a7c-44ee-962e-0a0e12176cff"), "Anonymous" },
                    { new Guid("7555dd25-ee7f-4a21-9156-3867dcbced77"), "Admin" }
                });

            migrationBuilder.InsertData(
                table: "EntityTypeFacetDefinitions",
                columns: new[] { "Id", "EnumTypeId", "FacetTypeId", "Name" },
                values: new object[] { 1, null, 1, "NotMapped" });

            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "Id", "ActionName", "ActionTypeId", "AppInstanceId", "EntityTypeId", "PermissionType", "RoleId", "UserId" },
                values: new object[] { 1, null, null, null, null, 1, new Guid("7555dd25-ee7f-4a21-9156-3867dcbced77"), null });

            migrationBuilder.InsertData(
                table: "PropertyFacetDefinitions",
                columns: new[] { "Id", "EnumTypeId", "FacetTypeId", "Name" },
                values: new object[,]
                {
                    { 1, null, 1, "HideInInsert" },
                    { 2, null, 1, "HideInEdit" },
                    { 3, null, 1, "IsRequired" },
                    { 4, null, 1, "HideInList" },
                    { 5, null, 1, "ReadOnlyInEdit" }
                });

            migrationBuilder.InsertData(
                table: "PropertyFacetDefaultValues",
                columns: new[] { "Id", "AppInstanceId", "AppTypeId", "DefaultValue", "FacetDefinitionId", "GeneralUsageCategoryId" },
                values: new object[,]
                {
                    { 1, null, null, "false", 1, 1 },
                    { 2, null, null, "true", 1, 2 },
                    { 12, null, null, "true", 1, 5 },
                    { 14, null, null, "true", 1, 4 },
                    { 3, null, null, "false", 2, 1 },
                    { 4, null, null, "true", 2, 2 },
                    { 13, null, null, "true", 2, 5 },
                    { 15, null, null, "true", 2, 4 },
                    { 5, null, null, "false", 3, 2 },
                    { 10, null, null, "false", 3, 4 },
                    { 11, null, null, "false", 3, 5 },
                    { 6, null, null, "true", 4, 2 },
                    { 8, null, null, "true", 4, 5 },
                    { 9, null, null, "true", 4, 4 },
                    { 7, null, null, "true", 5, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppInstances_AppTypeId",
                table: "AppInstances",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInstances_DatabaseProviderId",
                table: "AppInstances",
                column: "DatabaseProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInstances_MetadataReleaseId",
                table: "AppInstances",
                column: "MetadataReleaseId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInstances_Name",
                table: "AppInstances",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppInstances_Title",
                table: "AppInstances",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTypes_Name",
                table: "AppTypes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTypes_Title",
                table: "AppTypes",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetDefaultValues_AppInstanceId",
                table: "EntityTypeFacetDefaultValues",
                column: "AppInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetDefaultValues_AppTypeId",
                table: "EntityTypeFacetDefaultValues",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetDefaultValues_FacetDefinitionId",
                table: "EntityTypeFacetDefaultValues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetDefaultValues_GeneralUsageCategoryId",
                table: "EntityTypeFacetDefaultValues",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetDefinitions_EnumTypeId",
                table: "EntityTypeFacetDefinitions",
                column: "EnumTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetDefinitions_FacetTypeId",
                table: "EntityTypeFacetDefinitions",
                column: "FacetTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetValues_EntityTypeId",
                table: "EntityTypeFacetValues",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeFacetValues_FacetDefinitionId",
                table: "EntityTypeFacetValues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypes_BaseEntityTypeId",
                table: "EntityTypes",
                column: "BaseEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypes_GeneralUsageCategoryId",
                table: "EntityTypes",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypes_AppTypeId_Name",
                table: "EntityTypes",
                columns: new[] { "AppTypeId", "Name" },
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EnumValues_EnumTypeId",
                table: "EnumValues",
                column: "EnumTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpressionBodies_DefinitionId",
                table: "ExpressionBodies",
                column: "DefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpressionBodies_FormatId",
                table: "ExpressionBodies",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpressionDefinitions_ActiveBodyId",
                table: "ExpressionDefinitions",
                column: "ActiveBodyId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpressionDefinitions_MainInputEntityTypeId",
                table: "ExpressionDefinitions",
                column: "MainInputEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpressionDefinitions_AppTypeId_Identifier",
                table: "ExpressionDefinitions",
                columns: new[] { "AppTypeId", "Identifier" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MetadataReleases_AppTypeId",
                table: "MetadataReleases",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_ActionTypeId",
                table: "Permissions",
                column: "ActionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_AppInstanceId",
                table: "Permissions",
                column: "AppInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_EntityTypeId",
                table: "Permissions",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_RoleId",
                table: "Permissions",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_DataEntityTypeId",
                table: "Properties",
                column: "DataEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_DataTypeId",
                table: "Properties",
                column: "DataTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_ExpressionDefinitionId",
                table: "Properties",
                column: "ExpressionDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_ForeignKeyPropertyId",
                table: "Properties",
                column: "ForeignKeyPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_GeneralUsageCategoryId",
                table: "Properties",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_InversePropertyId",
                table: "Properties",
                column: "InversePropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_OwnerEntityTypeId_Name",
                table: "Properties",
                columns: new[] { "OwnerEntityTypeId", "Name" },
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetDefaultValues_AppInstanceId",
                table: "PropertyFacetDefaultValues",
                column: "AppInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetDefaultValues_AppTypeId",
                table: "PropertyFacetDefaultValues",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetDefaultValues_FacetDefinitionId",
                table: "PropertyFacetDefaultValues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetDefaultValues_GeneralUsageCategoryId",
                table: "PropertyFacetDefaultValues",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetDefinitions_EnumTypeId",
                table: "PropertyFacetDefinitions",
                column: "EnumTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetDefinitions_FacetTypeId",
                table: "PropertyFacetDefinitions",
                column: "FacetTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetValues_FacetDefinitionId",
                table: "PropertyFacetValues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyFacetValues_PropertyId",
                table: "PropertyFacetValues",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportDefinitions_EntityTypeId",
                table: "ReportDefinitions",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportDefinitions_ReportFormatId",
                table: "ReportDefinitions",
                column: "ReportFormatId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedFilters_InputEntityTypeId",
                table: "SavedFilters",
                column: "InputEntityTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExpressionDefinitions_ExpressionBodies_ActiveBodyId",
                table: "ExpressionDefinitions",
                column: "ActiveBodyId",
                principalTable: "ExpressionBodies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EntityTypes_AppTypes_AppTypeId",
                table: "EntityTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_ExpressionDefinitions_AppTypes_AppTypeId",
                table: "ExpressionDefinitions");

            migrationBuilder.DropForeignKey(
                name: "FK_EntityTypes_EntityTypeGeneralUsageCategories_GeneralUsageCategoryId",
                table: "EntityTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_ExpressionDefinitions_EntityTypes_MainInputEntityTypeId",
                table: "ExpressionDefinitions");

            migrationBuilder.DropForeignKey(
                name: "FK_ExpressionBodies_ExpressionDefinitions_DefinitionId",
                table: "ExpressionBodies");

            migrationBuilder.DropTable(
                name: "EntityTypeFacetDefaultValues");

            migrationBuilder.DropTable(
                name: "EntityTypeFacetValues");

            migrationBuilder.DropTable(
                name: "EnumValues");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "PropertyFacetDefaultValues");

            migrationBuilder.DropTable(
                name: "PropertyFacetValues");

            migrationBuilder.DropTable(
                name: "ReportDefinitions");

            migrationBuilder.DropTable(
                name: "SavedFilters");

            migrationBuilder.DropTable(
                name: "EntityTypeFacetDefinitions");

            migrationBuilder.DropTable(
                name: "EntityActionTypes");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "AppInstances");

            migrationBuilder.DropTable(
                name: "PropertyFacetDefinitions");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "ReportFormats");

            migrationBuilder.DropTable(
                name: "DatabaseProviders");

            migrationBuilder.DropTable(
                name: "MetadataReleases");

            migrationBuilder.DropTable(
                name: "EnumTypes");

            migrationBuilder.DropTable(
                name: "FacetTypes");

            migrationBuilder.DropTable(
                name: "DataTypes");

            migrationBuilder.DropTable(
                name: "PropertyGeneralUsageCategories");

            migrationBuilder.DropTable(
                name: "AppTypes");

            migrationBuilder.DropTable(
                name: "EntityTypeGeneralUsageCategories");

            migrationBuilder.DropTable(
                name: "EntityTypes");

            migrationBuilder.DropTable(
                name: "ExpressionDefinitions");

            migrationBuilder.DropTable(
                name: "ExpressionBodies");

            migrationBuilder.DropTable(
                name: "ExpressionFormats");
        }
    }
}
