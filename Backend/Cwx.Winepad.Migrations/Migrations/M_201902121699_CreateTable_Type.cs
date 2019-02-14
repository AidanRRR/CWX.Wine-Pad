using System;
using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121699)]
    public class M_201902121699_CreateTable_Type : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<WineType>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable();
        }

        public override void Down()
        {
        }
    }
}