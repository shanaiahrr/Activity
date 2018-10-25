using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Paper
    {
        [Key]
        public Guid PaperID { get; set; }

        [Required]
        public string TypeOfPaper { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public bool isActive { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }
    }
}
