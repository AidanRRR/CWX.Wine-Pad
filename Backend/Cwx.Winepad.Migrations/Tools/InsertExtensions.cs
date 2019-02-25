using Cwx.Winepad.Domain.Models;
using Cwx.Winepad.Infrastructure.Entities;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders.Insert;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class InsertExtensions
    {
        public static IInsertDataSyntax IntoEntityTable<TEntity>(this IInsertExpressionRoot root, object entity)
            where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return root.IntoTable(tableName).Row(entity);
        }
    }
}