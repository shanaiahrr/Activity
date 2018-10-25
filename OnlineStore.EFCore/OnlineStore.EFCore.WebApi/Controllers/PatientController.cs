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
    public class PatientController : ControllerBase
    {
        private IPatientRepository patientRepo;

        public PatientController(IPatientRepository patientRepo)
        {
            this.patientRepo = patientRepo;
        }
        // GET: api/Patient
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Patient>))]
        public ActionResult<IEnumerable<Patient>> Get()
        {


            return Ok(patientRepo.Retrieve().ToList());
        }

        // GET: api/Patient/5
        [HttpGet("{id}", Name = "GetPatientByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Patient))]
        public async Task<ActionResult<Patient>> Get(Guid id)
        {
            try
            {
                var result = await patientRepo.RetrieveAsync(id);
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

        // GET: api/Patient/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetPatientWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Patient>))]

        public async Task<ActionResult<PaginationResult<Patient>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Patient>();
                result = patientRepo.RetrievePatientWithPagination(page, itemsPerPage, filter);
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        // POST: api/Patient
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Patient))]
        public async Task<ActionResult<Patient>> Post([FromBody] Patient patient)
        {
            try
            {
                patient.PatientID = Guid.NewGuid();
                await patientRepo.CreateAsync(patient);
                return CreatedAtRoute("GetPatientByID",
                    new
                    {
                        id = patient.PatientID
                    },
                    patient);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Patient/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Patient))]
        public async Task<ActionResult<Patient>> Put(Guid id, [FromBody] Patient patient)
        {
            try
            {
                var result = patientRepo.Retrieve().FirstOrDefault(x => x.PatientID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await patientRepo.UpdateAsync(id, patient);

                return Ok(patient);

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
                var result = patientRepo.Retrieve().FirstOrDefault(x => x.PatientID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await patientRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
