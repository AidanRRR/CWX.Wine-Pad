using System;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;
using Type = Cwx.Winepad.Domain.Models.Type;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121699)]
    public class M_201902121699_CreateTable_Type : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Type>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable();
        }

        public override void Down()
        {
        }
    }
}