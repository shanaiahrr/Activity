using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(OnlineStoreDbContext context) : base(context)
        {

        }
    }
}
