using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_PostgreSql.Migrations
{
    public partial class RemoveConnectionStringsFromDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataConnectionString",
                table: "AppInstances");

            migrationBuilder.DropColumn(
                name: "LobConnectionString",
                table: "AppInstances");

            migrationBuilder.AddColumn<string>(
                name: "DataConnectionStringTemplateName",
                table: "AppInstances",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LobConnectionStringTemplateName",
                table: "AppInstances",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LobDatabaseName",
                table: "AppInstances",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MainDatabaseName",
                table: "AppInstances",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_UnifiedExternalUserId",
                table: "Users",
                column: "UnifiedExternalUserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_UnifiedExternalUserId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DataConnectionStringTemplateName",
                table: "AppInstances");

            migrationBuilder.DropColumn(
                name: "LobConnectionStringTemplateName",
                table: "AppInstances");

            migrationBuilder.DropColumn(
                name: "LobDatabaseName",
                table: "AppInstances");

            migrationBuilder.DropColumn(
                name: "MainDatabaseName",
                table: "AppInstances");

            migrationBuilder.AddColumn<string>(
                name: "DataConnectionString",
                table: "AppInstances",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LobConnectionString",
                table: "AppInstances",
                type: "text",
                nullable: true);
        }
    }
}
