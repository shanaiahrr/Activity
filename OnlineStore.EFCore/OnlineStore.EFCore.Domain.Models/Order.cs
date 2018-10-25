using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Order")]
    public class Order
    {
        [Key]
        public Guid OrderID { get; set; }

        [Required]
        public Guid CustomerID { get; set; }
        [ForeignKey("CustomerID")]
        public Customer Customer { get; set; }

        [Required]
        public Guid EmployeeID { get; set; }
        [ForeignKey("EmployeeID")]
        public Employee Employee { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public DateTime RequiredDate { get; set; }

        public DateTime ShippedDate { get; set; }

        public Guid ShipperID { get; set; }
        [ForeignKey("ShipperID")]
        public Guid ShippedVia { get; set; }

        public decimal Freight { get; set; }

        [MaxLength(100)]
        public string ShipName { get; set; }

        [MaxLength(100)]
        public string ShipAddress { get; set; }

        [MaxLength(100)]
        public string ShipCity { get; set; }

        [MaxLength(100)]
        public string ShipRegion { get; set; }

        [MaxLength(15)]
        public string ShipPostalCode { get; set; }

        [MaxLength(100)]
        [Required]
        public string ShipCountry { get; set; }

    }
}
