using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class SupplierRepository : RepositoryBase<Supplier>, ISupplierRepository
    {
        public SupplierRepository(OnlineStoreDbContext context) : base(context)
        {

        }
    }
}
