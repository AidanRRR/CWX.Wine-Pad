namespace Cwx.Winepad.Infrastructure.Entities.ModelBuilder
{
    public static class TableName
    {
        public static string ForEntity<TEntity>() where TEntity : class, IEntity
        {
            return typeof(TEntity).Name;
        }

        public static string ForManyToMany<TEntityLeft, TEntityRight>()
            where TEntityLeft : class, IEntity
            where TEntityRight : class, IEntity
        {
            var tableNameLeft = ForEntity<TEntityLeft>();
            var tableNameRight = ForEntity<TEntityRight>();

            return $"{tableNameLeft}{tableNameRight}";
        }
    }
}