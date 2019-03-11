using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201903111438)]
    public class M_201903111438_AlterTable_Card_OwnerColumn : Migration
    {
        public override void Up()
        {
            Alter.TableForEntity<Card>()
                .AddColumnForForeignKeyTo<Admin>("OwnerId")
                .NotNullable();

            Create.ForeignKey("FK_Card_Admin_Owner")
                .BetweenEntities<Card, Admin>("OwnerId");
        }

        public override void Down()
        {
        }
    }
}