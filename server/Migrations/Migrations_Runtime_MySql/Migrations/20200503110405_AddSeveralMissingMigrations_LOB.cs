using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_MySql.Migrations
{
    public partial class AddSeveralMissingMigrations_LOB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ExternalUserId = table.Column<string>(nullable: true),
                    UnifiedExternalUserId = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });
        }
    }
}
