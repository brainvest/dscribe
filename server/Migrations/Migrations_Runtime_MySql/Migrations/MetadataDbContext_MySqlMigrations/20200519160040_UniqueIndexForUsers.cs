using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_MySql.Migrations.MetadataDbContext_MySqlMigrations
{
    public partial class UniqueIndexForUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UnifiedExternalUserId",
                table: "users",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_UnifiedExternalUserId",
                table: "users",
                column: "UnifiedExternalUserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_users_UnifiedExternalUserId",
                table: "users");

            migrationBuilder.AlterColumn<string>(
                name: "UnifiedExternalUserId",
                table: "users",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
