using LeaderBoardApi.Models;

namespace LeaderBoardApi.Repositories
{
    public interface IPersonRepository
    {
        Task<Person> GetPersonAsync(int id);
        Task<IEnumerable<Person>> GetPersonsAsync();
        Task<Person> CreatePersonAsync(Person person);
        void UpdatePersonAsync(int id, Person person);
        void DeletePersonAsync(int id);
    }
}