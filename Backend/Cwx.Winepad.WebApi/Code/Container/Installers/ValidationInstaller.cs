using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Cwx.Winepad.Domain.Interfaces;
using FluentValidation;

namespace Cwx.Winepad.WebApi.Code.Container.Installers
{
    public class ValidationInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Classes
                .FromAssemblyContaining<IRepository>()
                .BasedOn(typeof(AbstractValidator<>))
                .WithServiceAllInterfaces()
                .LifestyleTransient());
        }
    }
}