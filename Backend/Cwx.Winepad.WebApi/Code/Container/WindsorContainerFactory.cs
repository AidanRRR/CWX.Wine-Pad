using System.Reflection;
using Castle.Facilities.TypedFactory;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.Resolvers.SpecializedResolvers;
using Castle.Windsor;
using Castle.Windsor.Installer;

namespace Cwx.Winepad.WebApi.Code.Container
{
    public static class WindsorContainerFactory
    {
        private static IWindsorContainer _container;

        public static IWindsorContainer GetContainer(Assembly applicationAssembly)
        {
            return _container ?? (_container = CreateContainer(applicationAssembly));
        }

        private static WindsorContainer CreateContainer(Assembly applicationAssembly)
        {
            var container = new WindsorContainer();

            container.AddFacility<TypedFactoryFacility>();

            container.Kernel.Resolver.AddSubResolver(new ArrayResolver(container.Kernel, true));
            container.Kernel.Resolver.AddSubResolver(new CollectionResolver(container.Kernel, true));

            container.Register(Component.For<IWindsorContainer>().Instance(container));

            container.Install(FromAssembly.Instance(applicationAssembly));

            return container;
        }
    }
}