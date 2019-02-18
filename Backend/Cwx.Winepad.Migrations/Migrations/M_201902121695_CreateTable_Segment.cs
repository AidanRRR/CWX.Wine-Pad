using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121695)]
    public class M_201902121695_CreateTable_Segment : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Segment>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumnForForeignKeyTo<Card>().NotNullable();

            Create.ForeignKey("FK_Segment_Card")
                .BetweenEntities<Segment, Card>();
        }

        public override void Down()
        {
        }
    }
}