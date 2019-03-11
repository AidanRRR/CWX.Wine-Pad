using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201903111148)]
    public class M_201903111148_AlterTable_Country_Code_Nullable : Migration
    {
        public override void Up()
        {
            Alter.TableForEntity<Country>()
                .AlterColumn("Code")
                .AsString().Nullable();
        }

        public override void Down()
        {
        }
    }
}