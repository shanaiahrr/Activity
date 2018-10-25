using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Customer> RetriveCustomerWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Customer> result = new PaginationResult<Customer>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Customer>().OrderBy(x => x.CompanyName).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Customer>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Customer>()
                  .Where(x => x.CompanyName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.CompanyName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Customer>()
                        .Where(x => x.CompanyName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }
}