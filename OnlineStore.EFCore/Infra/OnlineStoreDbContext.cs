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

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Department>().ToTable("Department");
        //    modelBuilder.Entity<Customer>().ToTable("Customer");
        //    modelBuilder.Entity<Category>().ToTable("Category");
        //    modelBuilder.Entity<Product>().ToTable("Product");
        //    modelBuilder.Entity<Order>().ToTable("Product");
        //    modelBuilder.Entity<OrderDetail>().ToTable("Product");
        //    modelBuilder.Entity<Shipper>().ToTable("Product");
        //    modelBuilder.Entity<Supplier>().ToTable("Product");

        //    base.OnModelCreating(modelBuilder);
        //}
    }
}