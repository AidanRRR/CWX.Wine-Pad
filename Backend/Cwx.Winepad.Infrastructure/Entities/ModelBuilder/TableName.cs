using Cwx.Winepad.Domain.Models;

namespace Cwx.Winepad.Infrastructure.Entities.ModelBuilder
{
    public static class TableName
    {
        public static string ForEntity<TEntity>() where TEntity : class, IEntity
        {
            return typeof(TEntity).Name;
        }
    }
}