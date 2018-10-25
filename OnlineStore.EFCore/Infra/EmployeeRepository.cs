using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
   public class EmployeeRepository:RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(OnlineStoreDbContext context):base(context)
        {

        }

       /* public IEnumerable<Employee> GetEmployeeByDepartment(Guid departmentId)
        {
            return base.context.Employees
                       .Where(e => e.DepartmentID == departmentId)
                       .ToList();
        }
        */
    }
}
