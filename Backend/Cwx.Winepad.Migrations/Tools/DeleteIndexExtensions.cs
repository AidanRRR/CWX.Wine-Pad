using Cwx.Winepad.Infrastructure.Entities;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders.Delete.Index;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class DeleteIndexExtensions
    {
        public static IDeleteIndexOnColumnOrInSchemaSyntax OnTableForEntity<TEntity>(this IDeleteIndexForTableSyntax root)
            where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return root.OnTable(tableName);
        }
    }
}