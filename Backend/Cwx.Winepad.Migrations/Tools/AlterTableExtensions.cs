using Cwx.Winepad.Infrastructure.Entities;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders.Alter;
using FluentMigrator.Builders.Alter.Table;
using UZA.Recist.Infrastructure.Entities.ModelBuilder;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class AlterTableExtensions
    {
        public static IAlterTableAddColumnOrAlterColumnOrSchemaOrDescriptionSyntax TableForEntity<TEntity>(this IAlterExpressionRoot root)
            where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return root.Table(tableName);
        } // IAlterTableColumnAsTypeSyntax

        public static IAlterTableColumnOptionOrAddColumnOrAlterColumnSyntax AddColumnForForeignKeyTo<TEntity>(
            this IAlterTableAddColumnOrAlterColumnOrSchemaOrDescriptionSyntax tableWithColumnSyntax, string columnName = null, bool nullable = false)
            where TEntity : class, IEntity
        {
            var defaultColumnName = ColumnName.ForeignKeyTo<TEntity>();
            var columnDefinition = tableWithColumnSyntax.AddColumn(columnName ?? defaultColumnName).AsInt32();

            return nullable
                ? columnDefinition.Nullable()
                : columnDefinition.NotNullable();
        }
    }
}