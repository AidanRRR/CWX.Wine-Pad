using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations
{
    [Migration(201902131135)]
    public class M_201902131135_CreateTable_CardAdmin : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<CardAdmin>()
                .WithPrimaryKeyColumn()
                .WithColumnForForeignKeyTo<Card>().NotNullable()
                .WithColumnForForeignKeyTo<Admin>().NotNullable();

            Create.ForeignKey("FK_CardAdmin_Card")
                .BetweenEntities<CardAdmin, Card>();

            Create.ForeignKey("FK_CardAdmin_Admin")
                .BetweenEntities<CardAdmin, Admin>();
        }

        public override void Down()
        {
        }
    }
}