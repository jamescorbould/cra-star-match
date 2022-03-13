#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeaderBoardApi.Models;
using LeaderBoardApi.Repositories;

namespace LeaderBoardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderBoardController : ControllerBase
    {
        private readonly IPersonRepository _repository;

        public LeaderBoardController(IPersonRepository repository)
        {
            this._repository = repository;
        }

        // GET: api/LeaderBoard
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersonAsync()
        {
            var persons = await _repository.GetPersonsAsync();

            if (persons is null)
            {
                return NotFound();
            }

            return Ok(persons);
        }

        // GET: api/LeaderBoard/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _repository.GetPersonAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        // PUT: api/LeaderBoard/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _repository.UpdatePersonAsync(id, person);

            return NoContent();
        }

        // POST: api/LeaderBoard
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            var result = await _repository.CreatePersonAsync(person);
            return CreatedAtAction(nameof(GetPerson), new { id = result.Id }, result);
        }

        // DELETE: api/LeaderBoard/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var person = await _repository.GetPersonAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            _repository.DeletePersonAsync(id);

            return NoContent();
        }
    }
}
