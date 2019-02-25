using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Cwx.Winepad.Domain.Interfaces;
using Cwx.Winepad.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.WebApi.Code.Container.Installers
{
    public class RepositoryInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            //container.Register(Component
            //    .For<IRepository>()
            //    .ImplementedBy<DbContextRepository>()
            //    .LifestyleTransient());

            //container.Register(Component
            //    .For<WinePadContext>()
            //    .ImplementedBy<WinePadContext>()
            //    .LifestyleTransient());
        }
    }
}