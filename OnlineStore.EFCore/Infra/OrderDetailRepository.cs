using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class OrderDetailRepository : RepositoryBase<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(OnlineStoreDbContext context) : base(context)
        {

        }
    }
}
