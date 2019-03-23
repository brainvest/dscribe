using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_MySql.Migrations.MetadataDbContext_MySqlMigrations
{
    public partial class initialize_metadata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "apptypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    Title = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_apptypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "databaseproviders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_databaseproviders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "datatypes",
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
                    table.PrimaryKey("PK_datatypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "entityactiontypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entityactiontypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "entitytypegeneralusagecategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entitytypegeneralusagecategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "enumtypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Identifier = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_enumtypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "expressionformats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Identifier = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_expressionformats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "facettypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Identifier = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_facettypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "propertygeneralusagecategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_propertygeneralusagecategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "reportformats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reportformats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "metadatareleases",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_metadatareleases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_metadatareleases_apptypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "apptypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "entitytypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_entitytypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_entitytypes_apptypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "apptypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_entitytypes_entitytypes_BaseEntityTypeId",
                        column: x => x.BaseEntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_entitytypes_entitytypegeneralusagecategories_GeneralUsageCat~",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "entitytypegeneralusagecategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "enumvalues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EnumTypeId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Identifier = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_enumvalues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_enumvalues_enumtypes_EnumTypeId",
                        column: x => x.EnumTypeId,
                        principalTable: "enumtypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "entitytypefacetdefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    FacetTypeId = table.Column<int>(nullable: false),
                    EnumTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entitytypefacetdefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_entitytypefacetdefinitions_enumtypes_EnumTypeId",
                        column: x => x.EnumTypeId,
                        principalTable: "enumtypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_entitytypefacetdefinitions_facettypes_FacetTypeId",
                        column: x => x.FacetTypeId,
                        principalTable: "facettypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "propertyfacetdefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    FacetTypeId = table.Column<int>(nullable: false),
                    EnumTypeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_propertyfacetdefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_propertyfacetdefinitions_enumtypes_EnumTypeId",
                        column: x => x.EnumTypeId,
                        principalTable: "enumtypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_propertyfacetdefinitions_facettypes_FacetTypeId",
                        column: x => x.FacetTypeId,
                        principalTable: "facettypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "appinstances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_appinstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_appinstances_apptypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "apptypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_appinstances_databaseproviders_DatabaseProviderId",
                        column: x => x.DatabaseProviderId,
                        principalTable: "databaseproviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_appinstances_metadatareleases_MetadataReleaseId",
                        column: x => x.MetadataReleaseId,
                        principalTable: "metadatareleases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "reportdefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<int>(nullable: false),
                    ReportFormatId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Definition = table.Column<byte[]>(nullable: true),
                    DefinitionUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reportdefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reportdefinitions_entitytypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_reportdefinitions_reportformats_ReportFormatId",
                        column: x => x.ReportFormatId,
                        principalTable: "reportformats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "savedfilters",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    InputEntityTypeId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: false),
                    Body = table.Column<string>(nullable: false),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_savedfilters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_savedfilters_entitytypes_InputEntityTypeId",
                        column: x => x.InputEntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "entitytypefacetvalues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<int>(nullable: false),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entitytypefacetvalues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_entitytypefacetvalues_entitytypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_entitytypefacetvalues_entitytypefacetdefinitions_FacetDefini~",
                        column: x => x.FacetDefinitionId,
                        principalTable: "entitytypefacetdefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "entitytypefacetdefaultvalues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    GeneralUsageCategoryId = table.Column<int>(nullable: false),
                    AppTypeId = table.Column<int>(nullable: true),
                    AppInstanceId = table.Column<int>(nullable: true),
                    DefaultValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entitytypefacetdefaultvalues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_entitytypefacetdefaultvalues_appinstances_AppInstanceId",
                        column: x => x.AppInstanceId,
                        principalTable: "appinstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_entitytypefacetdefaultvalues_apptypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "apptypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_entitytypefacetdefaultvalues_entitytypefacetdefinitions_Face~",
                        column: x => x.FacetDefinitionId,
                        principalTable: "entitytypefacetdefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_entitytypefacetdefaultvalues_entitytypegeneralusagecategorie~",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "entitytypegeneralusagecategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "permissions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_permissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_permissions_entityactiontypes_ActionTypeId",
                        column: x => x.ActionTypeId,
                        principalTable: "entityactiontypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_permissions_appinstances_AppInstanceId",
                        column: x => x.AppInstanceId,
                        principalTable: "appinstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_permissions_entitytypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_permissions_roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "propertyfacetdefaultvalues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    GeneralUsageCategoryId = table.Column<int>(nullable: false),
                    AppTypeId = table.Column<int>(nullable: true),
                    AppInstanceId = table.Column<int>(nullable: true),
                    DefaultValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_propertyfacetdefaultvalues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_propertyfacetdefaultvalues_appinstances_AppInstanceId",
                        column: x => x.AppInstanceId,
                        principalTable: "appinstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_propertyfacetdefaultvalues_apptypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "apptypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_propertyfacetdefaultvalues_propertyfacetdefinitions_FacetDef~",
                        column: x => x.FacetDefinitionId,
                        principalTable: "propertyfacetdefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_propertyfacetdefaultvalues_propertygeneralusagecategories_Ge~",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "propertygeneralusagecategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "expressiondefinitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_expressiondefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_expressiondefinitions_apptypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "apptypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_expressiondefinitions_entitytypes_MainInputEntityTypeId",
                        column: x => x.MainInputEntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "expressionbodies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_expressionbodies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_expressionbodies_expressiondefinitions_DefinitionId",
                        column: x => x.DefinitionId,
                        principalTable: "expressiondefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_expressionbodies_expressionformats_FormatId",
                        column: x => x.FormatId,
                        principalTable: "expressionformats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "properties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_properties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_properties_entitytypes_DataEntityTypeId",
                        column: x => x.DataEntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_properties_datatypes_DataTypeId",
                        column: x => x.DataTypeId,
                        principalTable: "datatypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_properties_expressiondefinitions_ExpressionDefinitionId",
                        column: x => x.ExpressionDefinitionId,
                        principalTable: "expressiondefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_properties_properties_ForeignKeyPropertyId",
                        column: x => x.ForeignKeyPropertyId,
                        principalTable: "properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_properties_propertygeneralusagecategories_GeneralUsageCatego~",
                        column: x => x.GeneralUsageCategoryId,
                        principalTable: "propertygeneralusagecategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_properties_properties_InversePropertyId",
                        column: x => x.InversePropertyId,
                        principalTable: "properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_properties_entitytypes_OwnerEntityTypeId",
                        column: x => x.OwnerEntityTypeId,
                        principalTable: "entitytypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "propertyfacetvalues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PropertyId = table.Column<int>(nullable: false),
                    FacetDefinitionId = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_propertyfacetvalues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_propertyfacetvalues_propertyfacetdefinitions_FacetDefinition~",
                        column: x => x.FacetDefinitionId,
                        principalTable: "propertyfacetdefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_propertyfacetvalues_properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "databaseproviders",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 2, "SqlServer" },
                    { 1, "MySql" }
                });

            migrationBuilder.InsertData(
                table: "datatypes",
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
                    { 11, "System.Guid", "Guid", true, "Guid" },
                    { 8, null, "NavigationEntity", false, "Navigation Property" },
                    { 7, null, "ForeignKey", true, "Foreign Key" },
                    { 6, "System.DateTime", "DateTime", true, "Date and Time" },
                    { 5, "System.TimeSpan", "Time", true, "Time Of Day" },
                    { 4, "System.DateTime", "Date", true, "Date" },
                    { 3, "System.Boolean", "bool", true, "Boolean" },
                    { 2, "System.String", "string", false, "String" },
                    { 9, null, "Enum", true, "Enum" }
                });

            migrationBuilder.InsertData(
                table: "entityactiontypes",
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
                table: "entitytypegeneralusagecategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "WorkingData" },
                    { 2, "BasicInfo" },
                    { 3, "Model" }
                });

            migrationBuilder.InsertData(
                table: "expressionformats",
                columns: new[] { "Id", "Identifier", "Title" },
                values: new object[,]
                {
                    { 3, "C#", "C#" },
                    { 1, "SimplePath", "Simple Path" },
                    { 2, "Json", "Json" }
                });

            migrationBuilder.InsertData(
                table: "facettypes",
                columns: new[] { "Id", "Identifier", "Name" },
                values: new object[,]
                {
                    { 3, "string", "String" },
                    { 1, "bool", "Boolean" },
                    { 2, "int", "Integer" }
                });

            migrationBuilder.InsertData(
                table: "propertygeneralusagecategories",
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
                table: "roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("2e17424d-9a7c-44ee-962e-0a0e12176cff"), "Anonymous" },
                    { new Guid("7555dd25-ee7f-4a21-9156-3867dcbced77"), "Admin" }
                });

            migrationBuilder.InsertData(
                table: "entitytypefacetdefinitions",
                columns: new[] { "Id", "EnumTypeId", "FacetTypeId", "Name" },
                values: new object[] { 1, null, 1, "NotMapped" });

            migrationBuilder.InsertData(
                table: "permissions",
                columns: new[] { "Id", "ActionName", "ActionTypeId", "AppInstanceId", "EntityTypeId", "PermissionType", "RoleId", "UserId" },
                values: new object[] { 1, null, null, null, null, 1, new Guid("7555dd25-ee7f-4a21-9156-3867dcbced77"), null });

            migrationBuilder.InsertData(
                table: "propertyfacetdefinitions",
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
                table: "propertyfacetdefaultvalues",
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
                name: "IX_appinstances_AppTypeId",
                table: "appinstances",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_appinstances_DatabaseProviderId",
                table: "appinstances",
                column: "DatabaseProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_appinstances_MetadataReleaseId",
                table: "appinstances",
                column: "MetadataReleaseId");

            migrationBuilder.CreateIndex(
                name: "IX_appinstances_Name",
                table: "appinstances",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_appinstances_Title",
                table: "appinstances",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_apptypes_Name",
                table: "apptypes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_apptypes_Title",
                table: "apptypes",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetdefaultvalues_AppInstanceId",
                table: "entitytypefacetdefaultvalues",
                column: "AppInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetdefaultvalues_AppTypeId",
                table: "entitytypefacetdefaultvalues",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetdefaultvalues_FacetDefinitionId",
                table: "entitytypefacetdefaultvalues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetdefaultvalues_GeneralUsageCategoryId",
                table: "entitytypefacetdefaultvalues",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetdefinitions_EnumTypeId",
                table: "entitytypefacetdefinitions",
                column: "EnumTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetdefinitions_FacetTypeId",
                table: "entitytypefacetdefinitions",
                column: "FacetTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetvalues_EntityTypeId",
                table: "entitytypefacetvalues",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypefacetvalues_FacetDefinitionId",
                table: "entitytypefacetvalues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypes_BaseEntityTypeId",
                table: "entitytypes",
                column: "BaseEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypes_GeneralUsageCategoryId",
                table: "entitytypes",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_entitytypes_AppTypeId_Name",
                table: "entitytypes",
                columns: new[] { "AppTypeId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_enumvalues_EnumTypeId",
                table: "enumvalues",
                column: "EnumTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_expressionbodies_DefinitionId",
                table: "expressionbodies",
                column: "DefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_expressionbodies_FormatId",
                table: "expressionbodies",
                column: "FormatId");

            migrationBuilder.CreateIndex(
                name: "IX_expressiondefinitions_ActiveBodyId",
                table: "expressiondefinitions",
                column: "ActiveBodyId");

            migrationBuilder.CreateIndex(
                name: "IX_expressiondefinitions_MainInputEntityTypeId",
                table: "expressiondefinitions",
                column: "MainInputEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_expressiondefinitions_AppTypeId_Identifier",
                table: "expressiondefinitions",
                columns: new[] { "AppTypeId", "Identifier" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_metadatareleases_AppTypeId",
                table: "metadatareleases",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_permissions_ActionTypeId",
                table: "permissions",
                column: "ActionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_permissions_AppInstanceId",
                table: "permissions",
                column: "AppInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_permissions_EntityTypeId",
                table: "permissions",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_permissions_RoleId",
                table: "permissions",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_DataEntityTypeId",
                table: "properties",
                column: "DataEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_DataTypeId",
                table: "properties",
                column: "DataTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_ExpressionDefinitionId",
                table: "properties",
                column: "ExpressionDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_ForeignKeyPropertyId",
                table: "properties",
                column: "ForeignKeyPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_GeneralUsageCategoryId",
                table: "properties",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_InversePropertyId",
                table: "properties",
                column: "InversePropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_properties_OwnerEntityTypeId_Name",
                table: "properties",
                columns: new[] { "OwnerEntityTypeId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetdefaultvalues_AppInstanceId",
                table: "propertyfacetdefaultvalues",
                column: "AppInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetdefaultvalues_AppTypeId",
                table: "propertyfacetdefaultvalues",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetdefaultvalues_FacetDefinitionId",
                table: "propertyfacetdefaultvalues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetdefaultvalues_GeneralUsageCategoryId",
                table: "propertyfacetdefaultvalues",
                column: "GeneralUsageCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetdefinitions_EnumTypeId",
                table: "propertyfacetdefinitions",
                column: "EnumTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetdefinitions_FacetTypeId",
                table: "propertyfacetdefinitions",
                column: "FacetTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetvalues_FacetDefinitionId",
                table: "propertyfacetvalues",
                column: "FacetDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_propertyfacetvalues_PropertyId",
                table: "propertyfacetvalues",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_reportdefinitions_EntityTypeId",
                table: "reportdefinitions",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_reportdefinitions_ReportFormatId",
                table: "reportdefinitions",
                column: "ReportFormatId");

            migrationBuilder.CreateIndex(
                name: "IX_savedfilters_InputEntityTypeId",
                table: "savedfilters",
                column: "InputEntityTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_expressiondefinitions_expressionbodies_ActiveBodyId",
                table: "expressiondefinitions",
                column: "ActiveBodyId",
                principalTable: "expressionbodies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_entitytypes_apptypes_AppTypeId",
                table: "entitytypes");

            migrationBuilder.DropForeignKey(
                name: "FK_expressiondefinitions_apptypes_AppTypeId",
                table: "expressiondefinitions");

            migrationBuilder.DropForeignKey(
                name: "FK_entitytypes_entitytypegeneralusagecategories_GeneralUsageCat~",
                table: "entitytypes");

            migrationBuilder.DropForeignKey(
                name: "FK_expressiondefinitions_entitytypes_MainInputEntityTypeId",
                table: "expressiondefinitions");

            migrationBuilder.DropForeignKey(
                name: "FK_expressionbodies_expressiondefinitions_DefinitionId",
                table: "expressionbodies");

            migrationBuilder.DropTable(
                name: "entitytypefacetdefaultvalues");

            migrationBuilder.DropTable(
                name: "entitytypefacetvalues");

            migrationBuilder.DropTable(
                name: "enumvalues");

            migrationBuilder.DropTable(
                name: "permissions");

            migrationBuilder.DropTable(
                name: "propertyfacetdefaultvalues");

            migrationBuilder.DropTable(
                name: "propertyfacetvalues");

            migrationBuilder.DropTable(
                name: "reportdefinitions");

            migrationBuilder.DropTable(
                name: "savedfilters");

            migrationBuilder.DropTable(
                name: "entitytypefacetdefinitions");

            migrationBuilder.DropTable(
                name: "entityactiontypes");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "appinstances");

            migrationBuilder.DropTable(
                name: "propertyfacetdefinitions");

            migrationBuilder.DropTable(
                name: "properties");

            migrationBuilder.DropTable(
                name: "reportformats");

            migrationBuilder.DropTable(
                name: "databaseproviders");

            migrationBuilder.DropTable(
                name: "metadatareleases");

            migrationBuilder.DropTable(
                name: "enumtypes");

            migrationBuilder.DropTable(
                name: "facettypes");

            migrationBuilder.DropTable(
                name: "datatypes");

            migrationBuilder.DropTable(
                name: "propertygeneralusagecategories");

            migrationBuilder.DropTable(
                name: "apptypes");

            migrationBuilder.DropTable(
                name: "entitytypegeneralusagecategories");

            migrationBuilder.DropTable(
                name: "entitytypes");

            migrationBuilder.DropTable(
                name: "expressiondefinitions");

            migrationBuilder.DropTable(
                name: "expressionbodies");

            migrationBuilder.DropTable(
                name: "expressionformats");
        }
    }
}
