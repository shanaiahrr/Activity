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
    public class PaperController : ControllerBase
    {
        private IPaperRepository paperRepo;

        public PaperController(IPaperRepository paperRepo)
        {
            this.paperRepo = paperRepo;
        }
        // GET: api/Paper
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Paper>))]
        public ActionResult<IEnumerable<Paper>> Get()
        {

            return Ok(paperRepo.Retrieve().ToList());
        }

        // GET: api/Paper/5
        [HttpGet("{id}", Name = "GetPaperByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Paper))]
        public async Task<ActionResult<Paper>> Get(Guid id)
        {
            try
            {
                var result = await paperRepo.RetrieveAsync(id);
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

        // GET: api/Paper/5/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetPaperWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Paper>))]
        public ActionResult<PaginationResult<Paper>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Paper>();
                result = paperRepo.RetrievePaperWithPagination(page, itemsPerPage, filter);
                return result;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Paper
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Paper))]
        public async Task<ActionResult<Paper>> Post([FromBody] Paper paper)
        {
            try
            {
                paper.PaperID = Guid.NewGuid();
                await paperRepo.CreateAsync(paper);
                return CreatedAtRoute("GetPaperByID",
                    new
                    {
                        id = paper.PaperID
                    },
                    paper);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Paper/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Paper))]
        public async Task<ActionResult<Paper>> Put(Guid id, [FromBody] Paper paper)
        {
            try
            {
                var result = paperRepo.Retrieve().FirstOrDefault(x => x.PaperID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await paperRepo.UpdateAsync(id, paper);

                return Ok(paper);

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
                var result = paperRepo.Retrieve().FirstOrDefault(x => x.PaperID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await paperRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }
}