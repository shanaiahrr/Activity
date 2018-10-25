using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Patient")]
    public class Patient
    {
        [Key]
        public Guid PatientID { get; set; }

        [MaxLength(60)]
        [Required]
        public string PatientFirstName { get; set; }

        [MaxLength(60)]
        public string PatientMiddleName { get; set; }

        [MaxLength(60)]
        [Required]
        public string PatientLastName { get; set; }

        [MaxLength(3)]
        [Required]
        public string PatientAge { get; set; }

        [Required]
        public string PatientGender { get; set; }

        [Required]
        public string MaritalStatus { get; set; }

        [MaxLength(15)]
        [Required]
        public string Phone { get; set; }

        [MaxLength(100)]
        [Required]
        public string Illness { get; set; }

        public bool isDischarged { get; set; }

    }
}
