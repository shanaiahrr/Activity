using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using OnlineStore.EFCore.Infra;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineStore.EFCore.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            #region DepartmentEmployee
            
            #region Create Record

            var context = new OnlineStoreDbContext();

            ICustomerRepository custRepo = new CustomerRepository(context);

            var newCustomer = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Shanaiah Roldan",
                CreditLimit = 1000M,
                IsActive = true
            };
            custRepo.Create(newCustomer);

            var tmg = new Department
            {
                DepartmentID = Guid.NewGuid(),
                DepartmentName = "Technology Management Group",
                IsActive = true
            };
            var bdg = new Department
            {
                DepartmentID = Guid.NewGuid(),
                DepartmentName = "Business Development Group",
                IsActive = true
            };
            context.Departments.Add(tmg);
            context.Departments.Add(bdg);
            context.SaveChanges();

            var john = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                EmpFirstName = "John",
                EmpMiddleName = "Turner",
                EmpLastName = "Smith",
                Department = bdg
            };
            var jervie = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                EmpFirstName = "Jervie",
                EmpMiddleName = "Lander",
                EmpLastName = "Patterson",
                Department = tmg
            };
            context.Employees.Add(john);
            context.Employees.Add(jervie);
            context.SaveChanges();

            #endregion

            #region Delete Record

            var arup = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                EmpFirstName = "Arup",
                EmpMiddleName = "C",
                EmpLastName = "Maity",
                Department = tmg

            };
            context.Employees.Add(arup);
            context.SaveChanges();

            arup = context.Employees.Find(arup.EmployeeID);
            context.Employees.Remove(arup);
            context.SaveChanges();

            #endregion

            #region Update Record

            var benjo = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                EmpFirstName = "Benjo",
                EmpMiddleName = "DJ",
                EmpLastName = "Guevarra",
                Department = bdg
            };

            benjo = context.Employees.Find(benjo.EmployeeID);
            benjo.EmpMiddleName = "De Jesus";
            context.Employees.Update(benjo);
            context.SaveChanges();
            #endregion

            #region Retrieve Records

            var departments = from d in context.Departments select d;

            var page2 = departments.Skip(40).Take(40).ToList();

            var tmgEmployees = from e in context.Employees
                               join d in context.Departments 
                               on e.DepartmentID equals d. DepartmentID
                               where d.DepartmentName.Equals ("Tecnlogy Management")
                               orderby e.EmpLastName descending
                               select new
                               {
                                   Fullname = e.EmpFirstName + "" +
                                              e.EmpMiddleName.Substring(0,1) + ". " +
                                              e.EmpLastName,
                                   Department = d.DepartmentName
                               };



            #endregion
   
            #endregion

          /*
            #region Customer

            #region Create Record

            var context = new OnlineStoreDbContext();
            var shan = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Shanaiah Roldan",
                CreditLimit = "100000",
                IsActive = true
            };
            var jel = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Jeline Roldan",
                CreditLimit = "125000",
                IsActive = true
            };

            var len = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Lina Roldan",
                CreditLimit = "150000",
                IsActive = true
            };
            var jhon = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Jhon Roldan",
                CreditLimit = "200000",
                IsActive = false
            };
            context.Customer.Add(shan);
            context.Customer.Add(jel);
            context.Customer.Add(len);
            context.Customer.Add(jhon);
            context.SaveChanges();

            #endregion

            #region Delete Record

            var spike = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Spike Roldan",
                CreditLimit = "500000",
                IsActive = false
            };
            context.Customer.Add(spike);
            context.SaveChanges();

            spike = context.Customer.Find(spike.CustomerID);
            context.Customer.Remove(spike);
            context.SaveChanges();

            #endregion

            #region Update Record

            shan = context.Customer.Find(shan.CustomerID);
            shan.CreditLimit = "300000";
            context.Customer.Update(shan);
            context.SaveChanges();
            #endregion

            #region Retrieve Records

            var customer = from c in context.Customer select c;

            #endregion
            #endregion
    */
        }
    }
}
