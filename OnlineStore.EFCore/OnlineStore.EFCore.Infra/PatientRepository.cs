using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class PatientRepository : RepositoryBase<Patient>, IPatientRepository
    {
        public PatientRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Patient> RetrievePatientWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Patient> result = new PaginationResult<Patient>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Patient>().OrderBy(x => x.PatientLastName).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Patient>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Patient>()
                  .Where(x => x.PatientLastName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.PatientLastName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Patient>()
                        .Where(x => x.PatientLastName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }


    }
}