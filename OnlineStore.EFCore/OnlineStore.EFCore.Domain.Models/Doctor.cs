using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Doctor")]
    public class Doctor
    {
        [Key]
        public Guid DoctorID { get; set; }

        [MaxLength(60)]
        [Required]
        public string DrFirstName { get; set; }

        [MaxLength(60)]
        public string DrMiddleName { get; set; }

        [MaxLength(60)]
        [Required]
        public string DrLastName { get; set; }

        [MaxLength(15)][Required]
        public string Phone { get; set; }

        [MaxLength(100)]
        [Required]
        public string Specialization { get; set; }

        [MaxLength(50)]
        [Required]
        public string LicenseNo { get; set; }

        [MaxLength(100)]
        [Required]
        public string WorksAt { get; set; }

        [MaxLength(60)]
        [Required]
        public string PhysicianType { get; set; }

        public bool isAvailable { get; set; }

    }
}
