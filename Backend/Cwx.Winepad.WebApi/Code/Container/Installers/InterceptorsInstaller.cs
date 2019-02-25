using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Cwx.Winepad.WebApi.Code.Container.Interceptors;

namespace Cwx.Winepad.WebApi.Code.Container.Installers
{
    public class InterceptorsInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component
                .For<ValidatorInterceptor>()
                .LifestyleTransient());
        }
    }
}