using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface IPaperRepository : IRepository<Paper>
    {
        PaginationResult<Paper> RetrievePaperWithPagination(int page, int itemsPerPage, string filter);
    }
}