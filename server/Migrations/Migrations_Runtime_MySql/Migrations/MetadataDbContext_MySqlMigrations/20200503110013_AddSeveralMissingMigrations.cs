using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_MySql.Migrations.MetadataDbContext_MySqlMigrations
{
    public partial class AddSeveralMissingMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "properties",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Version",
                table: "metadatareleases",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "facettypes",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "expressiondefinitions",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "enumvalues",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "enumtypes",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "entitytypes",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "datatypes",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "apptypes",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "appinstances",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(200)");

            migrationBuilder.AddColumn<string>(
                name: "DbContextName",
                table: "appinstances",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "appinstances",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "additionalbehaviors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Definition = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_additionalbehaviors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ExternalUserId = table.Column<string>(nullable: true),
                    UnifiedExternalUserId = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "propertybehaviors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PropertyId = table.Column<int>(nullable: false),
                    AdditionalBehaviorId = table.Column<int>(nullable: false),
                    Parameters = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_propertybehaviors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_propertybehaviors_additionalbehaviors_AdditionalBehaviorId",
                        column: x => x.AdditionalBehaviorId,
                        principalTable: "additionalbehaviors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_propertybehaviors_properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "additionalbehaviors",
                columns: new[] { "Id", "Definition", "Name" },
                values: new object[,]
                {
                    { 1, null, "DisplayAsDate" },
                    { 2, null, "DisplayAsDateTime" },
                    { 3, null, "SetTimeOnInsert" },
                    { 4, null, "SetTimeOnUpdate" },
                    { 5, null, "ShowDatePicker" },
                    { 6, null, "ShowDateTimePicker" }
                });

            migrationBuilder.InsertData(
                table: "databaseproviders",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "PostgreSql" });

            migrationBuilder.CreateIndex(
                name: "IX_additionalbehaviors_Name",
                table: "additionalbehaviors",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_propertybehaviors_AdditionalBehaviorId",
                table: "propertybehaviors",
                column: "AdditionalBehaviorId");

            migrationBuilder.CreateIndex(
                name: "IX_propertybehaviors_PropertyId",
                table: "propertybehaviors",
                column: "PropertyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "propertybehaviors");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "additionalbehaviors");

            migrationBuilder.DeleteData(
                table: "databaseproviders",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "DbContextName",
                table: "appinstances");

            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "appinstances");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "properties",
                type: "varchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Version",
                table: "metadatareleases",
                type: "varchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "facettypes",
                type: "varchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "expressiondefinitions",
                type: "varchar(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "enumvalues",
                type: "varchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Identifier",
                table: "enumtypes",
                type: "varchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "entitytypes",
                type: "varchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "datatypes",
                type: "varchar(200)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "apptypes",
                type: "nvarchar(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "appinstances",
                type: "varchar(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 200);
        }
    }
}
