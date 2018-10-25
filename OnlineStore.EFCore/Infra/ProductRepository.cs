using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(OnlineStoreDbContext context) : base(context)
        {

        }
    }
}
