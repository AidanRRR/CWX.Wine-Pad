using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders.Create;
using FluentMigrator.Builders.Create.Table;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class CreateTableExtensions
    {
        public static ICreateTableWithColumnSyntax TableForEntity<TEntity>(this ICreateExpressionRoot root)
            where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return root.Table(tableName);
        }

        public static ICreateTableColumnOptionOrWithColumnSyntax WithPrimaryKeyColumn(
            this ICreateTableWithColumnSyntax tableWithColumnSyntax, string columnName = ColumnName.PrimaryKey)
        {
            return tableWithColumnSyntax.WithColumn(columnName).AsInt32().NotNullable().PrimaryKey().Identity();
        }

        public static ICreateTableColumnOptionOrWithColumnSyntax WithColumnForForeignKeyTo<TEntity>(
            this ICreateTableWithColumnSyntax tableWithColumnSyntax, string columnName = null, bool nullable = false)
            where TEntity : class, IEntity
        {
            var defaultColumnName = ColumnName.ForeignKeyTo<TEntity>();
            var columnDefinition = tableWithColumnSyntax.WithColumn(columnName ?? defaultColumnName).AsInt32();

            return nullable
                ? columnDefinition.Nullable()
                : columnDefinition.NotNullable();
        }
    }
}