﻿using System;
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
    public class CustomerController : ControllerBase
    {
        private ICustomerRepository customerRepo;

        public CustomerController(ICustomerRepository customerRepo)
        {
            this.customerRepo = customerRepo;
        }
        // GET: api/Customer
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Customer>))]
        public ActionResult<IEnumerable<Customer>> Get()
        {

            return Ok(customerRepo.Retrieve().ToList());
        }

        // GET: api/Customer/5
        [HttpGet("{id}", Name = "GetCustomerByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Customer))]
        public async Task<ActionResult<Customer>> Get(Guid id)
        {
            try
            {
                var result = await customerRepo.RetrieveAsync(id);
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

        // GET: api/Customer/5
        [HttpGet("{page}/{itemsPerPage}", Name = "GetCustomerWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Customer>))]

        public async Task<ActionResult<PaginationResult<Customer>>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Customer>();
                result = customerRepo.RetriveCustomerWithPagination(page, itemsPerPage, filter);
                return result;

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        // POST: api/Customer
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Customer))]
        public async Task<ActionResult<Customer>> Post([FromBody] Customer customer)
        {
            try
            {
                customer.CustomerID = Guid.NewGuid();
                await customerRepo.CreateAsync(customer);
                return CreatedAtRoute("GetCustomerByID",
                    new
                    {
                        id = customer.CustomerID
                    },
                    customer);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Customer/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Customer))]
        public async Task<ActionResult<Customer>> Put(Guid id, [FromBody] Customer customer)
        {
            try
            {
                var result = customerRepo.Retrieve().FirstOrDefault(x => x.CustomerID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await customerRepo.UpdateAsync(id, customer);

                return Ok(customer);

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
                var result = customerRepo.Retrieve().FirstOrDefault(x => x.CustomerID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await customerRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
