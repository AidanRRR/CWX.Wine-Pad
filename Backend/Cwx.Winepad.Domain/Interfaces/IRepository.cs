using System.Collections.Generic;
using Cwx.Winepad.Domain.Models;

namespace Cwx.Winepad.Domain.Interfaces
{
    public interface IRepository
    {
        T GetById<T>(int id) where T : IEntity;
        List<T> List<T>(ISpecification<T> spec = null) where T : IEntity;
        T Add<T>(T entity) where T : IEntity;
        void Update<T>(T entity) where T : IEntity;
        void Delete<T>(T entity) where T : IEntity;
    }
}