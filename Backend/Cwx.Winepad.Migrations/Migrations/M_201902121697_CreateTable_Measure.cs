using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121697)]
    public class M_201902121697_CreateTable_Measure : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Measure>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("Price").AsDecimal().NotNullable();
        }

        public override void Down()
        {
        }
    }
}