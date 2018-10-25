using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Employee> RetriveEmployeeWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Employee> result = new PaginationResult<Employee>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Employee>().OrderBy(x => x.EmpLastName).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Employee>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Employee>()
                  .Where(x => x.EmpLastName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.EmpLastName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Employee>()
                        .Where(x => x.EmpLastName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }
}