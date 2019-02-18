using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121698)]
    public class M_201902121698_CreateTable_SegmentWine : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<SegmentWine>()
                .WithPrimaryKeyColumn()
                .WithColumnForForeignKeyTo<Segment>().NotNullable()
                .WithColumnForForeignKeyTo<Wine>().NotNullable();

            Create.ForeignKey("FK_SegmentWine_Segment")
                .BetweenEntities<SegmentWine, Segment>();

            Create.ForeignKey("FK_SegmentWine_Wine")
                .BetweenEntities<SegmentWine, Wine>();
        }

        public override void Down()
        {
        }
    }
}