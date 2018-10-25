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
    public class DoctorController : ControllerBase
    {
        private IDoctorRepository doctorRepo;

        public DoctorController(IDoctorRepository doctorRepo)
        {
            this.doctorRepo = doctorRepo;
        }
        // GET: api/Doctor
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Doctor>))]
        public ActionResult<IEnumerable<Doctor>> Get()
        {


            return Ok(doctorRepo.Retrieve().ToList());
        }

        // GET: api/Doctor/5
        [HttpGet("{id}", Name = "GetDoctorByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Doctor))]
        public async Task<ActionResult<Doctor>> Get(Guid id)
        {
            try
            {
                var result = await doctorRepo.RetrieveAsync(id);
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

        // GET: api/Doctor/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetDoctorWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Doctor>))]

        public async Task<ActionResult<PaginationResult<Doctor>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Doctor>();
                result = doctorRepo.RetrieveDoctorWithPagination(page, itemsPerPage, filter);
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        // POST: api/Doctor
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Doctor))]
        public async Task<ActionResult<Doctor>> Post([FromBody] Doctor doctor)
        {
            try
            {
                doctor.DoctorID = Guid.NewGuid();
                await doctorRepo.CreateAsync(doctor);
                return CreatedAtRoute("GetDoctorByID",
                    new
                    {
                        id = doctor.DoctorID
                    },
                    doctor);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Doctor/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Doctor))]
        public async Task<ActionResult<Doctor>> Put(Guid id, [FromBody] Doctor doctor)
        {
            try
            {
                var result = doctorRepo.Retrieve().FirstOrDefault(x => x.DoctorID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await doctorRepo.UpdateAsync(id, doctor);

                return Ok(doctor);

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
                var result = doctorRepo.Retrieve().FirstOrDefault(x => x.DoctorID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await doctorRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
