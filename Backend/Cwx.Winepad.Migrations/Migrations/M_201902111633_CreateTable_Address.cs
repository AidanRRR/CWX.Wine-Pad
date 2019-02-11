using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902111633)]
    public class M_201902111633_CreateTable_Address : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Address>()
                .WithPrimaryKeyColumn()
                .WithColumn("Street").AsString().NotNullable()
                .WithColumn("Number").AsString().NotNullable()
                .WithColumn("BusNumber").AsString().Nullable()
                .WithColumn("City").AsString().NotNullable()
                .WithColumn("PostalCode").AsString().NotNullable()
                .WithColumnForForeignKeyTo<Address>().NotNullable();

            Create.ForeignKey("FK_Address_Country")
                .BetweenEntities<Address, Country>();

        }

        public override void Down()
        {
        }
    }
}