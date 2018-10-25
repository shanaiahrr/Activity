using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;

namespace OnlineStore.EFCore.WebApi.Controllers
{
    [EnableCors("OnlineStoreAngular6")]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private IDepartmentRepository departmentRepo;

        public DepartmentController(IDepartmentRepository departmentRepo)
        {
            this.departmentRepo = departmentRepo;
        }
        // GET: api/Department
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Department>))]
        public ActionResult<IEnumerable<Department>> Get()
        {

            return Ok(departmentRepo.Retrieve().ToList());
        }

        // GET: api/Department/5
        [HttpGet("{id}", Name = "GetDepartmentByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Department))]
        public async Task<ActionResult<Department>> Get(Guid id)
        {
            try
            {
                var result = await departmentRepo.RetrieveAsync(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Department/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetDepartmentWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Department>))]

        public async Task<ActionResult<PaginationResult<Department>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Department>();
                result = departmentRepo.RetriveDepartmentWithPagination(page, itemsPerPage, filter);
                return result;

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        // POST: api/Department
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Department))]
        public async Task<ActionResult<Department>> Post([FromBody] Department department)
        {
            try
            {
                department.DepartmentID = Guid.NewGuid();
                await departmentRepo.CreateAsync(department);
                return CreatedAtRoute("GetDepartmentByID",
                    new
                    {
                        id = department.DepartmentID
                    },
                    department);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Department/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Department))]
        public async Task<ActionResult<Department>> Put(Guid id, [FromBody] Department department)
        {
            try
            {
                var result = departmentRepo.Retrieve().FirstOrDefault(x => x.DepartmentID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await departmentRepo.UpdateAsync(id, department);

                return Ok(department);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var result = departmentRepo.Retrieve().FirstOrDefault(x => x.DepartmentID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await departmentRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
