using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Domain
{
    public interface IPersonRepository : IRepository<Person>
    {
        PaginationResult<Person> RetrievePersonWithPagination(int page, int itemsPerPage, string filter);
    }
}