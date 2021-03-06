﻿using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Migrations.Tools;
using FluentMigrator;

namespace Cwx.Winepad.Migrations.Migrations
{
    [Migration(201902121655)]
    public class M_201902121655_CreateTable_Country : Migration
    {
        public override void Up()
        {
            Create.TableForEntity<Country>()
                .WithPrimaryKeyColumn()
                .WithColumn("Name").AsString()
                .WithColumn("Code").AsString();
        }

        public override void Down()
        {
        }
    }
}