using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902111602)]
    public class M_201902111602_CreateTable_Country : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Country>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString()
                .WithColumn("Code").AsString();
        }

        public override void Down()
        {
        }
    }
}