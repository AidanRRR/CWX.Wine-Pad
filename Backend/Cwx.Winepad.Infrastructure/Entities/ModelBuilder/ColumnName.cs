using Cwx.Winepad.Domain.Models;

namespace Cwx.Winepad.Infrastructure.Entities.ModelBuilder
{
    public static class ColumnName
    {
        public const string PrimaryKey = "Id";

        public static string ForeignKeyTo<TEntity>() where TEntity : class, IEntity
        {
            var tableName = TableName.ForEntity<TEntity>();
            return $"{tableName}Id";
        }
    }
}