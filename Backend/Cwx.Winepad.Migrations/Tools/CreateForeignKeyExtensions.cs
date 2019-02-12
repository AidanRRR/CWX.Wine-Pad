using Cwx.Winepad.Infrastructure.Entities;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;
using FluentMigrator.Builders.Create.ForeignKey;

namespace Cwx.Winepad.Migrations.Tools
{
    public static class CreateForeignKeyExtensions
    {
        public static ICreateForeignKeyCascadeSyntax BetweenEntities<TForeignEntity, TPrimaryEntity>(this ICreateForeignKeyFromTableSyntax root, string foreignColumnName = null)
            where TForeignEntity : class, IEntity
            where TPrimaryEntity : class, IEntity
        {
            var foreignTableName = TableName.ForEntity<TForeignEntity>();
            foreignColumnName = foreignColumnName ?? ColumnName.ForeignKeyTo<TPrimaryEntity>();

            var primaryTableName = TableName.ForEntity<TPrimaryEntity>();
            var primaryColumnName = ColumnName.PrimaryKey;

            return root
                .FromTable(foreignTableName).ForeignColumn(foreignColumnName)
                .ToTable(primaryTableName).PrimaryColumn(primaryColumnName);
        }
    }
}