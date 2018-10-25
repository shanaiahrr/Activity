using Microsoft.EntityFrameworkCore;
using OnlineStore.EFCore.Domain.Models;

namespace OnlineStore.EFCore.Infra
{
    public class OnlineStoreDbContext: DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Shipper> Shippers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Doctor> Doctor { get; set; }
        public DbSet<Patient> Patient { get; set; }

        public DbSet<Person> Person { get; set; }
        public DbSet<Paper> Paper { get; set; }


        public OnlineStoreDbContext(DbContextOptions<OnlineStoreDbContext> options):base(options)
        {

        }
        public OnlineStoreDbContext()
        {

        }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=.;Database=OnlineStoreDB;Integrated Security=true;";
            optionsBuilder.UseSqlServer(connectionString);
        }
        
    }
}