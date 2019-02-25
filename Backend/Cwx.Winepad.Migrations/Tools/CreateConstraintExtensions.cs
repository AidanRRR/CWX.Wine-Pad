using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders.Create;
using FluentMigrator.Builders.Create.ForeignKey;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class CreateConstraintExtensions
    {
        public static ICreateForeignKeyCascadeSyntax ForeignKey<TFromEntity, TToEntity>(this ICreateExpressionRoot root,
            string fromColumnName = null, string toColumnName = "Id")
            where TFromEntity : class, IEntity
            where TToEntity : class, IEntity
        {
            var tableFrom = TableName.ForEntity<TFromEntity>();
            var tableTo = TableName.ForEntity<TToEntity>();

            fromColumnName = fromColumnName ?? $"{tableTo}{ColumnName.PrimaryKey}";
            toColumnName = toColumnName ?? ColumnName.PrimaryKey;

            return root
                .ForeignKey($"FK_{tableFrom}_{fromColumnName}_{tableTo}_{toColumnName}")
                .FromTable(tableFrom)
                .ForeignColumn(fromColumnName)
                .ToTable(tableTo)
                .PrimaryColumn(toColumnName);
        }
    }
}