using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121733)]
    public class M_201902121733CreateTable_Card : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Card>()
                .WithPrimaryKeyColumn();

            Create.ForeignKey("FK_Card_Admin")
                .BetweenEntities<Card, Admin>();
            
        }

        public override void Down()
        {
        }
    }
}