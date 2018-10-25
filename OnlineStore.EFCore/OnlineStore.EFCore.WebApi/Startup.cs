﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Infra;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.EntityFrameworkCore;
using OnlineStore.EFCore.WebApi.Utils;
using System.Data.SqlClient;

namespace OnlineStore.EFCore.WebApi
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

            var onlineStoreSettings = Configuration.GetSection("OnlineStoreSettings").Get<OnlineStoreSettings>();
            services.AddSingleton<OnlineStoreSettings>(onlineStoreSettings);
            //services.AddSingleton<OnlineStoreDbContext>();
            services.AddDbContext<OnlineStoreDbContext>(options =>
            {
                var connectionString = Configuration["OnlineStoreSettings:ConnectionString"];
                var password = Configuration["DbPassword"];
                var builder = new SqlConnectionStringBuilder(connectionString);
                builder.Password = password;
                var connection = builder.ConnectionString;
                options.UseSqlServer(connection);
            });
            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            services.AddTransient<IDepartmentRepository, DepartmentRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IShipperRepository, ShipperRepository>();
            services.AddTransient<ISupplierRepository, SupplierRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IOrderDetailRepository, OrderDetailRepository>();
            services.AddTransient<IDoctorRepository, DoctorRepository>();
            services.AddTransient<IPatientRepository, PatientRepository>();
            services.AddTransient<IPersonRepository, PersonRepository>();
            services.AddTransient<IPaperRepository, PaperRepository>();



            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddCors(config => {
                config.AddPolicy("OnlineStoreAngular6", policy => {
                    policy.AllowAnyMethod();
                    policy.AllowAnyHeader();
                    policy.AllowAnyOrigin();
                    policy.AllowCredentials();
                    //policy.WithOrigins("http://localhost:4200", "http://localhost:4200/");

                });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "OnlineStore API", Version = "v1" });
            });
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

            app.UseSwagger();
            app.UseSwaggerUI(c=>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OnlineStore API v1");
            });
            //app.UseHttpsRedirection();
            app.UseCors("OnlineStoreAngular6");

            app.UseMvc();
        }
    }
}
