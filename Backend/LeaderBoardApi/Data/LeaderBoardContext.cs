#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LeaderBoardApi.Models;

public class LeaderBoardContext : DbContext
{
    public LeaderBoardContext(DbContextOptions<LeaderBoardContext> options)
        : base(options)
    {
    }

    public DbSet<Person> Person { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)    
    {    
        modelBuilder.Entity<Person>().HasData    
        (    
            new Person { Id = 1, Name = "Bob", TimeSecs = "3.01" },
            new Person { Id = 2, Name = "John", TimeSecs = "4.02" },
            new Person { Id = 3, Name = "Simon", TimeSecs = "2.59" }
        );
    }
}
