using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class ShipperRepository : RepositoryBase<Shipper>, IShipperRepository
    {
        public ShipperRepository(OnlineStoreDbContext context) : base(context)
        {

        }
    }
}
