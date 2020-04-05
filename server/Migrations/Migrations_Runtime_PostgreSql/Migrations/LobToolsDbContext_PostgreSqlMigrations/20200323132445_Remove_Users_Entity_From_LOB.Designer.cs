﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Migrations_Runtime_PostgreSql;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Migrations_Runtime_PostgreSql.Migrations.LobToolsDbContext_PostgreSqlMigrations
{
    [DbContext(typeof(LobToolsDbContext_PostgreSql))]
    [Migration("20200323132445_Remove_Users_Entity_From_LOB")]
    partial class Remove_Users_Entity_From_LOB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Brainvest.Dscribe.LobTools.Entities.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<byte[]>("Data")
                        .HasColumnType("bytea");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("EntityTypeId")
                        .HasColumnType("integer");

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<int>("Identifier")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<long>("Size")
                        .HasColumnType("bigint");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("Brainvest.Dscribe.LobTools.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("EntityTypeId")
                        .HasColumnType("integer");

                    b.Property<int>("Identifier")
                        .HasColumnType("integer");

                    b.Property<long?>("RequestLogId")
                        .HasColumnType("bigint");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Brainvest.Dscribe.LobTools.Entities.DataLog", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Body")
                        .HasColumnType("text");

                    b.Property<long>("DataId")
                        .HasColumnType("bigint");

                    b.Property<int>("DataRequestAction")
                        .HasColumnType("integer");

                    b.Property<long>("EntityId")
                        .HasColumnType("bigint");

                    b.Property<long>("RequestLogId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("RequestLogId");

                    b.ToTable("DataLogs");
                });

            modelBuilder.Entity("Brainvest.Dscribe.LobTools.Entities.Draft", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("ActionTypeId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("EntityTypeId")
                        .HasColumnType("integer");

                    b.Property<Guid>("Identifier")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsLastVersion")
                        .HasColumnType("boolean");

                    b.Property<string>("JsonData")
                        .HasColumnType("text");

                    b.Property<Guid?>("OwnerUserId")
                        .HasColumnType("uuid");

                    b.Property<int>("Version")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Drafts");
                });

            modelBuilder.Entity("Brainvest.Dscribe.LobTools.Entities.RequestLog", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("AppInstanceId")
                        .HasColumnType("integer");

                    b.Property<int?>("AppTypeId")
                        .HasColumnType("integer");

                    b.Property<string>("Body")
                        .HasColumnType("text");

                    b.Property<int?>("EntityTypeId")
                        .HasColumnType("integer");

                    b.Property<string>("ExceptionMessage")
                        .HasColumnType("text");

                    b.Property<string>("ExceptionTitle")
                        .HasColumnType("text");

                    b.Property<bool>("Failed")
                        .HasColumnType("boolean");

                    b.Property<bool>("HadException")
                        .HasColumnType("boolean");

                    b.Property<string>("IpAddress")
                        .HasColumnType("text");

                    b.Property<string>("Method")
                        .HasColumnType("text");

                    b.Property<string>("Path")
                        .HasColumnType("text");

                    b.Property<double>("ProcessDuration")
                        .HasColumnType("double precision");

                    b.Property<int?>("PropertyId")
                        .HasColumnType("integer");

                    b.Property<string>("QueryString")
                        .HasColumnType("text");

                    b.Property<long?>("RequestSize")
                        .HasColumnType("bigint");

                    b.Property<string>("Response")
                        .HasColumnType("text");

                    b.Property<long?>("ResponseSize")
                        .HasColumnType("bigint");

                    b.Property<int>("ResponseStatusCode")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("RequestLogs");
                });

            modelBuilder.Entity("Brainvest.Dscribe.LobTools.Entities.DataLog", b =>
                {
                    b.HasOne("Brainvest.Dscribe.LobTools.Entities.RequestLog", "RequestLog")
                        .WithMany("DataLogs")
                        .HasForeignKey("RequestLogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}