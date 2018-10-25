using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class DepartmentRepository : RepositoryBase <Department>, IDepartmentRepository
    {
        public DepartmentRepository(OnlineStoreDbContext context) : base(context)
        {

        }
    }
}
