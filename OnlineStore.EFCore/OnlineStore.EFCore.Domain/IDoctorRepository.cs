using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.EFCore.Domain
{
    public interface IDoctorRepository : IRepository<Doctor>
    {
        PaginationResult<Doctor> RetrieveDoctorWithPagination(int page, int itemsPerPage, string filter);
    }
}
