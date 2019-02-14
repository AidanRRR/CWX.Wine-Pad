using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902140935)]
    public class M_201902140935_CreateTable_CardSegment : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<CardSegment>()
                .WithPrimaryKeyColumn()
                .WithColumnForForeignKeyTo<Card>().NotNullable()
                .WithColumnForForeignKeyTo<Segment>().NotNullable();

            Create.ForeignKey("FK_CardSegment_Card")
                .BetweenEntities<CardSegment, Card>();

            Create.ForeignKey("FK_CardSegment_Segment")
                .BetweenEntities<CardSegment, Segment>();
        }

        public override void Down()
        {
        }
    }
}