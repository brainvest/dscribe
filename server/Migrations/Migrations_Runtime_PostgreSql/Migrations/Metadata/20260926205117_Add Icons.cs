using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Brainvest.Dscribe.Migrations.Runtime.PostgreSql.Migrations.Metadata
{
    /// <inheritdoc />
    public partial class AddIcons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IconName",
                table: "EntityTypes",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IconTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IconTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IconInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IconTypeId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Path = table.Column<string>(type: "text", nullable: false),
                    AppTypeId = table.Column<int>(type: "integer", nullable: true),
                    AppInstanceId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IconInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IconInfos_AppInstances_AppInstanceId",
                        column: x => x.AppInstanceId,
                        principalTable: "AppInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_IconInfos_AppTypes_AppTypeId",
                        column: x => x.AppTypeId,
                        principalTable: "AppTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_IconInfos_IconTypes_IconTypeId",
                        column: x => x.IconTypeId,
                        principalTable: "IconTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "IconTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 0, "GoogleMaterial" },
                    { 1, "FontAwesome" },
                    { 2, "RelativePath" },
                    { 3, "AbsolutePath" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_IconInfos_AppInstanceId",
                table: "IconInfos",
                column: "AppInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_IconInfos_AppTypeId",
                table: "IconInfos",
                column: "AppTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_IconInfos_IconTypeId",
                table: "IconInfos",
                column: "IconTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_IconInfos_Name_AppTypeId_AppInstanceId",
                table: "IconInfos",
                columns: new[] { "Name", "AppTypeId", "AppInstanceId" },
                unique: true)
                .Annotation("Npgsql:NullsDistinct", false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IconInfos");

            migrationBuilder.DropTable(
                name: "IconTypes");

            migrationBuilder.DropColumn(
                name: "IconName",
                table: "EntityTypes");
        }
    }
}
