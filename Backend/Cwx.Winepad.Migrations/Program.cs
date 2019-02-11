using System;
using System.Collections;
using System.IO;
using System.Reflection;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Cwx.Winepad.Migrations
{
    public class Program
    {
        public const string ConnectionStringName = "Database";
        public static readonly Type SampleMigrationType = typeof(Program);
        public static readonly string ConfirmWord = "y";

        public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
            .Build();

        public static void Main(string[] args)
        {
            try
            {
                var connectionString = Configuration.GetConnectionString(ConnectionStringName);
                if (string.IsNullOrWhiteSpace(connectionString))
                {
                    Console.WriteLine($"ERROR: Could not find connection string named '{ConnectionStringName}'");
                    return;
                }

                Console.WriteLine("Migration runner for Winepad");
                Console.WriteLine("Connection string: " + connectionString);
                Console.WriteLine("Assembly: " + SampleMigrationType.Assembly.FullName);

                if (!Confirm(args, "--confirm", "Run migrations"))
                {
                    return;
                }

                Console.WriteLine("Running migrations...\n");

                CreateServices(SampleMigrationType.Assembly, connectionString)
                    .GetRequiredService<IMigrationRunner>()
                    .MigrateUp();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.ReadLine();
            }
        }

        private static IServiceProvider CreateServices(Assembly migrationsAssembly, string connectionString)
        {
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(connectionString)
                    .ScanIn(migrationsAssembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .Configure<LogFileFluentMigratorLoggerOptions>(opt =>
                {
                    opt.ShowSql = true;
                    opt.ShowElapsedTime = true;
                })
                .BuildServiceProvider(false);
        }

        private static bool Confirm(string[] args, string autoConfirmArg, string question)
        {
            if (!((IList) args).Contains(autoConfirmArg))
            {
                Console.Write($"\n{question}, type '{ConfirmWord}' to continue: ");
                var response = Console.ReadLine()?.ToLowerInvariant();
                var confirmed = string.Equals(ConfirmWord, response);

                return confirmed;
            }

            return true;
        }
    }
}