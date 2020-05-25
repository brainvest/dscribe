using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_MySql.Migrations.MetadataDbContext_MySqlMigrations
{
    public partial class RemoveConnectionStringsFromDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataConnectionString",
                table: "appinstances");

            migrationBuilder.DropColumn(
                name: "LobConnectionString",
                table: "appinstances");

            migrationBuilder.AddColumn<string>(
                name: "DataConnectionStringTemplateName",
                table: "appinstances",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoadBusinessFromAssemblyName",
                table: "appinstances",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LobConnectionStringTemplateName",
                table: "appinstances",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LobDatabaseName",
                table: "appinstances",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MainDatabaseName",
                table: "appinstances",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataConnectionStringTemplateName",
                table: "appinstances");

            migrationBuilder.DropColumn(
                name: "LoadBusinessFromAssemblyName",
                table: "appinstances");

            migrationBuilder.DropColumn(
                name: "LobConnectionStringTemplateName",
                table: "appinstances");

            migrationBuilder.DropColumn(
                name: "LobDatabaseName",
                table: "appinstances");

            migrationBuilder.DropColumn(
                name: "MainDatabaseName",
                table: "appinstances");

            migrationBuilder.AddColumn<string>(
                name: "DataConnectionString",
                table: "appinstances",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LobConnectionString",
                table: "appinstances",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}
