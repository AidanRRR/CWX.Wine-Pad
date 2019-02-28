using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121699)]
    public class M_201902121699_CreateTable_Measure : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Measure>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("Price").AsDecimal().NotNullable()
                .WithColumnForForeignKeyTo<Wine>().NotNullable();
                

            Create.ForeignKey("FK_Measure_Wine")
                .BetweenEntities<Measure, Wine>();
        }

        public override void Down()
        {
        }
    }
}