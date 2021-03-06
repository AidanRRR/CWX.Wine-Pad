﻿using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121697)]
    public class M_201902121697_CreateTable_Wine : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Wine>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("Year").AsInt32().Nullable()
                .WithColumn("Description").AsString().Nullable()
                .WithColumn("GlassPrice").AsDecimal().Nullable()
                .WithColumn("BottlePrice").AsDecimal().Nullable()
                .WithColumn("CarafePrice").AsDecimal().Nullable()
                //.WithColumn("IsDeleted").AsBoolean().NotNullable()
                .WithColumnForForeignKeyTo<WineType>().NotNullable()
                .WithColumnForForeignKeyTo<Region>().Nullable()
                .WithColumnForForeignKeyTo<Admin>().NotNullable();
                

            Create.ForeignKey("FK_Wine_Type")
                .BetweenEntities<Wine, WineType>();

            Create.ForeignKey("FK_Wine_Region")
                .BetweenEntities<Wine, Region>();

            Create.ForeignKey("FK_Wine_Admin")
                .BetweenEntities<Wine, Admin>();

        }

        public override void Down()
        {
        }
    }
}