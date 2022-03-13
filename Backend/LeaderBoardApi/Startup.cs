using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Text.Json;
using System.Net.Mime;
using LeaderBoardApi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LeaderBoardApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //var telemetrySettings = Configuration.GetSection("TelemetrySettings").Get<TelemetrySettings>();
            //services.AddApplicationInsightsTelemetry(telemetrySettings.InstrumentationKey);

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "LeaderBoardAPI", Version = "v1" });
            });

            services.AddHealthChecks();

            services.AddDbContext<LeaderBoardContext>(options => options.UseSqlite(Configuration.GetConnectionString("LeaderBoardContext")));

            services.AddScoped<DbContext, LeaderBoardContext>();

            services.AddScoped<IPersonRepository, PersonRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "LeaderBoardAPI v1"));

            if (env.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.MapHealthChecks("/health/ready", new HealthCheckOptions {
                    Predicate = (check) => check.Tags.Contains("ready"),
                    ResponseWriter = async(context, report) => 
                    {
                        var result = JsonSerializer.Serialize(
                            new{
                                status = report.Status.ToString(),
                                checks = report.Entries.Select(entry => new {
                                    name = entry.Key,
                                    status = entry.Value.Status.ToString(),
                                    exception = entry.Value.Exception != null ? entry.Value.Exception.Message : "none",
                                    duration = entry.Value.Duration.ToString()
                                })
                            }
                        );

                        context.Response.ContentType = MediaTypeNames.Application.Json;
                        await context.Response.WriteAsync(result);
                    }
                });
                
                endpoints.MapHealthChecks("/health/live", new HealthCheckOptions {
                    Predicate = (_) => false
                });
            });
        }
    }
}
