namespace LeaderBoardApi.Models;

public class PersonList
{
    public List<Person> Persons { get; set; }

    public PersonList()
    {
        Persons = new List<Person>();
    }
}