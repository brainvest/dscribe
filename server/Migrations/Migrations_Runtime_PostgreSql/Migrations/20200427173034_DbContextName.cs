using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_PostgreSql.Migrations
{
    public partial class DbContextName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DbContextName",
                table: "AppInstances",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "AppInstances",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DbContextName",
                table: "AppInstances");

            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "AppInstances");
        }
    }
}
