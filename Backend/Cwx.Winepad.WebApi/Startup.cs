using System;
using Castle.Windsor.MsDependencyInjection;
using Cwx.Winepad.Domain.Interfaces;
using Cwx.Winepad.Infrastructure.Context;
using Cwx.Winepad.WebApi.Code.Container;
using Cwx.Winepad.WebApi.Code.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Swagger;

namespace Cwx.Winepad.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .AddMvcOptions(mvc =>
                {
                    mvc.Filters.Add(new ValidationExceptionFilter());
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(j => j.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "Winepad",
                    Version = "v1",
                    Description = "APi documentation: Winepad",
                });
                c.CustomSchemaIds(csi => csi.FullName);
            });

            services.AddTransient<IRepository, DbContextRepository>();
            services.AddDbContext<DbContext, WinePadContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Database")));

            var windsorContainer = WindsorContainerFactory.GetContainer(typeof(Startup).Assembly);
            var windsorServiceProvider = WindsorRegistrationHelper.CreateServiceProvider(windsorContainer, services);

            return windsorServiceProvider;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder => { builder.AllowAnyOrigin(); });

            app.UseHttpsRedirection();
            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "API V1");
            });
        }
    }
}
