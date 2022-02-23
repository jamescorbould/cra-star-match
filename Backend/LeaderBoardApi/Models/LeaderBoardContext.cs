using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace LeaderBoardApi.Models;

public class LeaderBoardContext : DbContext
{
    public LeaderBoardContext(DbContextOptions<DbContext> options)
        : base(options)
    {
    }

    public DbSet<Person> Persons { get; set; } = null!;
}