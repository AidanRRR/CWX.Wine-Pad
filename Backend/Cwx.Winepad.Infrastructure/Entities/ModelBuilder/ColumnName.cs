using Cwx.Winepad.Infrastructure.Entities;
using Cwx.Winepad.Infrastructure.Entities.ModelBuilder;

namespace UZA.Recist.Infrastructure.Entities.ModelBuilder
{
    public static class ColumnName
    {
        public const string PrimaryKey = "Id";

        public static string ForeignKeyTo<TEntity>() where TEntity: class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return $"{tableName}Id";
        }
    }
}