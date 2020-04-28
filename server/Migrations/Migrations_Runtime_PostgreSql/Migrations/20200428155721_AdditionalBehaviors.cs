using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Migrations_Runtime_PostgreSql.Migrations
{
    public partial class AdditionalBehaviors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdditionalBehaviors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    Definition = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalBehaviors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PropertyBehaviors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PropertyId = table.Column<int>(nullable: false),
                    AdditionalBehaviorId = table.Column<int>(nullable: false),
                    Parameters = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyBehaviors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyBehaviors_AdditionalBehaviors_AdditionalBehaviorId",
                        column: x => x.AdditionalBehaviorId,
                        principalTable: "AdditionalBehaviors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PropertyBehaviors_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "AdditionalBehaviors",
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

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalBehaviors_Name",
                table: "AdditionalBehaviors",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PropertyBehaviors_AdditionalBehaviorId",
                table: "PropertyBehaviors",
                column: "AdditionalBehaviorId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyBehaviors_PropertyId",
                table: "PropertyBehaviors",
                column: "PropertyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PropertyBehaviors");

            migrationBuilder.DropTable(
                name: "AdditionalBehaviors");
        }
    }
}
