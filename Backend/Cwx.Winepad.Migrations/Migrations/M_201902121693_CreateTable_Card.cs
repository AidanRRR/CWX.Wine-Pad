using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121693)]
    public class M_201902121693_CreateTable_Card : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Card>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString();
        }

        public override void Down()
        {
        }
    }
}