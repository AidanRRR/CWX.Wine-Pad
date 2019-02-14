using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902130941)]
    public class M_201902130941_CreateTable_Card : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Card>()
                .WithPrimaryKeyColumn();
        }

        public override void Down()
        {
        }
    }
}