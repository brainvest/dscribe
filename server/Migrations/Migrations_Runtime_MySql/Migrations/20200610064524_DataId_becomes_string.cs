namespace Migrations_Runtime_MySql.Migrations;

using Microsoft.EntityFrameworkCore.Migrations;

public partial class DataId_becomes_string : Migration
{
	protected override void Up(MigrationBuilder migrationBuilder)
	{
		migrationBuilder.AlterColumn<string>(
			name: "DataId",
			table: "datalogs",
			nullable: true,
			oldClrType: typeof(long),
			oldType: "bigint");
	}

	protected override void Down(MigrationBuilder migrationBuilder)
	{
		migrationBuilder.AlterColumn<long>(
			name: "DataId",
			table: "datalogs",
			type: "bigint",
			nullable: false,
			oldClrType: typeof(string),
			oldNullable: true);
	}
}
