using Cwx.Winepad.Domain.Models;

namespace Cwx.Winepad.Infrastructure.Entities.ModelBuilder
{
    public static class IndexName
    {
        public static string UniqueOnEnity<TEntity>(params string[] colums)
            where TEntity : class, IEntity
        {
            return $"UX_{TableName.ForEntity<TEntity>()}_{string.Join("_", colums)}";
        }
    }
}