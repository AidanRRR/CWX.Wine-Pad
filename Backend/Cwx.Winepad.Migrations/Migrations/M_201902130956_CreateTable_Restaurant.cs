﻿using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902130956)]
    public class M_201902130956_CreateTable_Restaurant : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Restaurant>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString().NotNullable()
                .WithColumn("VAT").AsString().NotNullable()
                .WithColumnForForeignKeyTo<Address>().NotNullable()
                .WithColumnForForeignKeyTo<Card>().Nullable();

            Create.ForeignKey("FK_Restaurant_Address")
                .BetweenEntities<Restaurant, Address>();

            Create.ForeignKey("FK_Restaurant_Card")
                .BetweenEntities<Restaurant, Card>();
        }

        public override void Down()
        {
        }
    }
}