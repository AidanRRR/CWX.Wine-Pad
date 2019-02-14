using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902131731)]
    public class M_201902131731_CreateTable_Segment : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Segment>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable();
        }

        public override void Down()
        {
        }
    }
}