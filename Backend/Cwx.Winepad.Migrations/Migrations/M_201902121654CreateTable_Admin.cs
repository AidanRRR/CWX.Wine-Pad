using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121654)]
    public class M_201902121654CreateTable_Admin : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Admin>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable();

        }

        public override void Down()
        {
        }
    }
}