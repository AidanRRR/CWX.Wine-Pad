using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121700)]
    public class M201902121700_CreateTable_Wine : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Wine>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("Year").AsInt32().Nullable()
                .WithColumn("Description").AsString().Nullable()
                .WithColumn("GlassPrice").AsDecimal().Nullable()
                .WithColumn("BottlePrice").AsDecimal().Nullable()
                .WithColumn("CarafePrice").AsDecimal().Nullable()
                .WithColumnForForeignKeyTo<WineType>().NotNullable()
                .WithColumnForForeignKeyTo<Region>().Nullable()
                .WithColumnForForeignKeyTo<Measure>().Nullable();


            Create.ForeignKey("FK_Wine_Type")
                .BetweenEntities<Wine, WineType>();

            Create.ForeignKey("DK_Wine_Region")
                .BetweenEntities<Wine, Region>();

            Create.ForeignKey("FK_Wine_Measure")
                .BetweenEntities<Wine, Measure>();
        }

        public override void Down()
        {
        }
    }
}