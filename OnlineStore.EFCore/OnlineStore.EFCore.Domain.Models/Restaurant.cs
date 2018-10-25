using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Restaurant")]
    public class Restaurant
    {
        [Key]
        public Guid ModelID { get; set; }

        [MaxLength(100)]
        [Required]
        public string Origin { get; set; }

        [MaxLength(100)]
        [Required]
        public string  Destination { get; set; }

        [MaxLength(100)]
        [Required]
        public string DateDeparted { get; set; }

        [MaxLength(100)]
        public string DateArrived { get; set; }

        public bool Delivery { get; set; }

    }
}
