using Microsoft.EntityFrameworkCore.Migrations;

namespace Brainvest.Dscribe.MetadataDbAccess.Migrations
{
	public partial class ModelEntityAndCodeNamespace : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<string>(
					name: "GeneratedCodeNamespace",
					table: "AppInstances",
					nullable: true);

			migrationBuilder.InsertData(
					table: "EntityGeneralUsageCategories",
					columns: new[] { "Id", "Name" },
					values: new object[] { 3, "Model" });
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DeleteData(
					table: "EntityGeneralUsageCategories",
					keyColumn: "Id",
					keyValue: 3);

			migrationBuilder.DropColumn(
					name: "GeneratedCodeNamespace",
					table: "AppInstances");
		}
	}
}
