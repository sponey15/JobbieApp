using System.Text.Json.Serialization;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IJobbieRepository, JobbieRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IOfferRepository, OfferRepository>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddMvc().AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            
            services.AddDbContext<DataContext>(x => {
                x.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            
            return services;
        }
    }
}