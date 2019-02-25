using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Models;

namespace Cwx.Winepad.Domain.Interfaces
{
    public interface IRepository
    {
        IQueryable<TEntity> Query<TEntity>() where TEntity : class, IEntity;
        Task InsertAsync<TEntity>(TEntity entity, CancellationToken cancellationToken) where TEntity : class, IEntity;
        Task UpdateAsync<TEntity>(TEntity entity, CancellationToken cancellationToken) where TEntity : class, IEntity;
    }
}