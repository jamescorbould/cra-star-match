#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LeaderBoardApi.Models;

    public class LeaderBoardContext : DbContext
    {
        public LeaderBoardContext (DbContextOptions<LeaderBoardContext> options)
            : base(options)
        {
        }

        public DbSet<LeaderBoardApi.Models.Person> Person { get; set; }
    }
