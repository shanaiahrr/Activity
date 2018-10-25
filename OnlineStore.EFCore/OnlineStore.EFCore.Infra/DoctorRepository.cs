using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class DoctorRepository : RepositoryBase<Doctor>, IDoctorRepository
    {
        public DoctorRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Doctor> RetrieveDoctorWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Doctor> result = new PaginationResult<Doctor>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Doctor>().OrderBy(x => x.DrLastName).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Doctor>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Doctor>()
                  .Where(x => x.DrLastName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.DrLastName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Doctor>()
                        .Where(x => x.DrLastName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
  

    }
}