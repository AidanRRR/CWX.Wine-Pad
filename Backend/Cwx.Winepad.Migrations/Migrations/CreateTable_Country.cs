using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902111602)]
    public class M_201902111602_CreateTable_Country : Migration
    {
        public override void Up()
        {
            Create.Table("Country")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("Name").AsString()
                .WithColumn("Code").AsString();
        }

        public override void Down()
        {
        }
    }
}