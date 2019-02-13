using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902131125)]
    public class M_201902131125_CreateTable_CardWine : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<CardWine>()
                .WithPrimaryKeyColumn()
                .WithColumnForForeignKeyTo<Card>().NotNullable()
                .WithColumnForForeignKeyTo<Wine>().NotNullable();

           Create.ForeignKey("FK_CardWine_Card")
                .BetweenEntities<CardWine, Card>();

           Create.ForeignKey("FK_CardWine_Wine")
               .BetweenEntities<CardWine, Wine>();

        }

        public override void Down()
        {
        }
    }
}