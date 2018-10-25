using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class PaperRepository : RepositoryBase<Paper>, IPaperRepository
    {
        public PaperRepository(OnlineStoreDbContext context) : base(context)
        {

        }

        public PaginationResult<Paper> RetrievePaperWithPagination(int page, int itemsPerPage, string filter)
        {

            PaginationResult<Paper> result = new PaginationResult<Paper>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Paper>().OrderBy(x => x.TypeOfPaper).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Paper>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Paper>()
                  .Where(x => x.TypeOfPaper.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.TypeOfPaper)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Paper>()
                        .Where(x => x.TypeOfPaper.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }
}