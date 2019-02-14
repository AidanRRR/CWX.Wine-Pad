using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121698)]
    public class M_201902121698_CreateTable_Region : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Region>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumnForForeignKeyTo<Country>().NotNullable();

            Create.ForeignKey("FK_Region_Country")
                .BetweenEntities<Region, Country>();
        }

        public override void Down()
        {
        }
    }
}