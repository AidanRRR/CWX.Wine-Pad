using Cwx.Winepad.Infrastructure.Entities;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders.Create.Index;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class CreateIndexExtensions
    {
        public static ICreateIndexOnColumnOrInSchemaSyntax OnTableForEntity<TEntity>(this ICreateIndexForTableSyntax root)
            where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return root.OnTable(tableName);
        }
    }
}