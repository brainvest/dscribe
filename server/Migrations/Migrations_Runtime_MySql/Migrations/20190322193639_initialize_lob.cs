using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Migrations_Runtime_MySql.Migrations
{
    public partial class initialize_lob : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "attachments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<int>(nullable: false),
                    Identifier = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    FileName = table.Column<string>(nullable: true),
                    Size = table.Column<long>(nullable: false),
                    Data = table.Column<byte[]>(nullable: true),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_attachments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EntityTypeId = table.Column<int>(nullable: false),
                    Identifier = table.Column<int>(nullable: false),
                    RequestLogId = table.Column<long>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "drafts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityTypeId = table.Column<int>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    OwnerUserId = table.Column<Guid>(nullable: true),
                    Identifier = table.Column<Guid>(nullable: false),
                    Version = table.Column<int>(nullable: false),
                    IsLastVersion = table.Column<bool>(nullable: false),
                    JsonData = table.Column<string>(nullable: true),
                    ActionTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_drafts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "requestlogs",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StartTime = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    QueryString = table.Column<string>(nullable: true),
                    Method = table.Column<string>(nullable: true),
                    Body = table.Column<string>(nullable: true),
                    RequestSize = table.Column<long>(nullable: true),
                    IpAddress = table.Column<string>(nullable: true),
                    EntityTypeId = table.Column<int>(nullable: true),
                    PropertyId = table.Column<int>(nullable: true),
                    AppTypeId = table.Column<int>(nullable: true),
                    AppInstanceId = table.Column<int>(nullable: true),
                    ProcessDuration = table.Column<double>(nullable: false),
                    Failed = table.Column<bool>(nullable: false),
                    HadException = table.Column<bool>(nullable: false),
                    Response = table.Column<string>(nullable: true),
                    ResponseStatusCode = table.Column<int>(nullable: false),
                    ResponseSize = table.Column<long>(nullable: true),
                    ExceptionTitle = table.Column<string>(nullable: true),
                    ExceptionMessage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_requestlogs", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "datalogs",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Body = table.Column<string>(nullable: true),
                    DataRequestAction = table.Column<int>(nullable: false),
                    RequestLogId = table.Column<long>(nullable: false),
                    DataId = table.Column<long>(nullable: false),
                    EntityId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_datalogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_datalogs_requestlogs_RequestLogId",
                        column: x => x.RequestLogId,
                        principalTable: "requestlogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_datalogs_RequestLogId",
                table: "datalogs",
                column: "RequestLogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "attachments");

            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropTable(
                name: "datalogs");

            migrationBuilder.DropTable(
                name: "drafts");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "requestlogs");
        }
    }
}
