using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121694)]
    public class M_201902121694_CreateTable_Region : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Region>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumnForForeignKeyTo<Country>().NotNullable()
                .WithColumnForForeignKeyTo<Admin>().Nullable();

            Create.ForeignKey("FK_Region_Country")
                .BetweenEntities<Region, Country>();

            Create.ForeignKey("FK_Region_Admin")
                .BetweenEntities<Region, Admin>();
        }

        public override void Down()
        {
        }
    }
}