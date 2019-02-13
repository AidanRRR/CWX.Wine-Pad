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
                .WithColumn("Title").AsString().NotNullable()
                .WithColumn("Region").AsString().NotNullable()
                .WithColumn("Year").AsInt32().NotNullable()
                .WithColumn("Price").AsDecimal().NotNullable()
                .WithColumn("Description").AsString().Nullable()
                .WithColumnForForeignKeyTo<Country>().NotNullable();

            Create.ForeignKey("FK_Wine_Country")
                .BetweenEntities<Wine, Country>();
        }

        public override void Down()
        {
        }
    }
}