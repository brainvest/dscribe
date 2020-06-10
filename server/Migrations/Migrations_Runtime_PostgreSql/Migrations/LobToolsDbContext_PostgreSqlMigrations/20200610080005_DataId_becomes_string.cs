using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_PostgreSql.Migrations.LobToolsDbContext_PostgreSqlMigrations
{
    public partial class DataId_becomes_string : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DataId",
                table: "DataLogs",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "DataId",
                table: "DataLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
