using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_MySql.Migrations.MetadataDbContext_MySqlMigrations
{
    public partial class Undo_MoveAssemblyNameToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoadBusinessFromAssemblyName",
                table: "appinstances");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LoadBusinessFromAssemblyName",
                table: "appinstances",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}
