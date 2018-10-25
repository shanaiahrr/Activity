using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Department
    {
        public Guid DepartmentID { get; set; }
        [MaxLength(100)]
        public string DepartmentName { get; set; }
        public bool IsActive { get; set; }
        public List<Employee> Employees { get; set; }

    }
}
