using Cwx.Winepad.Infrastructure.Entities;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders;
using FluentMigrator.Builders.Delete;
using FluentMigrator.Builders.Delete.Column;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class DeleteTableExtensions
    {
        public static void TableForEntity<TEntity>(this IDeleteExpressionRoot root) where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            root.Table(tableName);
        }

        public static IInSchemaSyntax FromTableForEntity<TEntity>(this IDeleteColumnFromTableSyntax root) where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return root.FromTable(tableName);
        }
    }
}