using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Brainvest.Dscribe.Migrations.Runtime.PostgreSql.Migrations.LobTools
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EntityTypeId = table.Column<int>(type: "integer", nullable: false),
                    Identifier = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    FileName = table.Column<string>(type: "text", nullable: true),
                    Size = table.Column<long>(type: "bigint", nullable: false),
                    Data = table.Column<byte[]>(type: "bytea", nullable: true),
                    Url = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EntityTypeId = table.Column<int>(type: "integer", nullable: false),
                    Identifier = table.Column<int>(type: "integer", nullable: false),
                    RequestLogId = table.Column<long>(type: "bigint", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Drafts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EntityTypeId = table.Column<int>(type: "integer", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OwnerUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    Identifier = table.Column<Guid>(type: "uuid", nullable: false),
                    Version = table.Column<int>(type: "integer", nullable: false),
                    IsLastVersion = table.Column<bool>(type: "boolean", nullable: false),
                    JsonData = table.Column<string>(type: "text", nullable: true),
                    ActionTypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drafts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RequestLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    Path = table.Column<string>(type: "text", nullable: true),
                    QueryString = table.Column<string>(type: "text", nullable: true),
                    Method = table.Column<string>(type: "text", nullable: true),
                    Body = table.Column<string>(type: "text", nullable: true),
                    RequestSize = table.Column<long>(type: "bigint", nullable: true),
                    IpAddress = table.Column<string>(type: "text", nullable: true),
                    EntityTypeId = table.Column<int>(type: "integer", nullable: true),
                    PropertyId = table.Column<int>(type: "integer", nullable: true),
                    AppTypeId = table.Column<int>(type: "integer", nullable: true),
                    AppInstanceId = table.Column<int>(type: "integer", nullable: true),
                    ProcessDuration = table.Column<double>(type: "double precision", nullable: false),
                    Failed = table.Column<bool>(type: "boolean", nullable: false),
                    HadException = table.Column<bool>(type: "boolean", nullable: false),
                    Response = table.Column<string>(type: "text", nullable: true),
                    ResponseStatusCode = table.Column<int>(type: "integer", nullable: false),
                    ResponseSize = table.Column<long>(type: "bigint", nullable: true),
                    ExceptionTitle = table.Column<string>(type: "text", nullable: true),
                    ExceptionMessage = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DataLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Body = table.Column<string>(type: "text", nullable: true),
                    DataRequestAction = table.Column<int>(type: "integer", nullable: false),
                    RequestLogId = table.Column<long>(type: "bigint", nullable: false),
                    DataId = table.Column<string>(type: "text", nullable: true),
                    EntityId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataLogs_RequestLogs_RequestLogId",
                        column: x => x.RequestLogId,
                        principalTable: "RequestLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DataLogs_RequestLogId",
                table: "DataLogs",
                column: "RequestLogId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "DataLogs");

            migrationBuilder.DropTable(
                name: "Drafts");

            migrationBuilder.DropTable(
                name: "RequestLogs");
        }
    }
}
