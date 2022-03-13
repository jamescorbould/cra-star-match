using Microsoft.EntityFrameworkCore;
using LeaderBoardApi.Models;

namespace LeaderBoardApi.Repositories;

public class PersonRepository : IPersonRepository
{
    private readonly LeaderBoardContext _context;

    public PersonRepository(LeaderBoardContext context)
    {
        _context = context;
    }

    public async Task<Person> CreatePersonAsync(Person person)
    {
        _context.Person.Add(person);
        await _context.SaveChangesAsync();
        return person;
    }

    public async void DeletePersonAsync(int id)
    {
        var person = await _context.Person.FindAsync(id);
        _context.Person.Remove(person);
        await _context.SaveChangesAsync();
    }

    public async Task<Person> GetPersonAsync(int id)
    {
        return await _context.Person.FindAsync(id);
    }

    public async Task<IEnumerable<Person>> GetPersonsAsync()
    {
        return await _context.Person.ToListAsync();
    }

    public async void UpdatePersonAsync(int id, Person person)
    {
        _context.Entry(person).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    private bool PersonExists(int id)
    {
        return _context.Person.Any(e => e.Id == id);
    }
}
