using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Cwx.Winepad.Domain.Interfaces;
using Cwx.Winepad.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Infrastructure.Context
{
    public class DbContextRepository : IRepository
    {
        private readonly WinePadContext _context;

        public DbContextRepository(WinePadContext context)
        {
            _context = context;
        }

        public IQueryable<TEntity> Query<TEntity>() where TEntity : class, IEntity
        {
            return _context.Set<TEntity>();
        }

        public Task InsertAsync<TEntity>(TEntity entity, CancellationToken cancellationToken) where TEntity : class, IEntity
        {
            entity.Id = 0;
            _context.Set<TEntity>().Add(entity);
            return _context.SaveChangesAsync(cancellationToken);
        }

        public Task UpdateAsync<TEntity>(TEntity entity, CancellationToken cancellationToken) where TEntity : class, IEntity
        {
            var entry = _context.Entry(entity);
            _context.Set<TEntity>().Attach(entity);
            entry.State = EntityState.Modified;
            return _context.SaveChangesAsync(cancellationToken);
        }
    }
}