using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaderBoardApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Person",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    TimeSecs = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Person",
                columns: new[] { "Id", "Name", "TimeSecs" },
                values: new object[] { 1, "Bob", "3.01" });

            migrationBuilder.InsertData(
                table: "Person",
                columns: new[] { "Id", "Name", "TimeSecs" },
                values: new object[] { 2, "John", "4.02" });

            migrationBuilder.InsertData(
                table: "Person",
                columns: new[] { "Id", "Name", "TimeSecs" },
                values: new object[] { 3, "Simon", "2.59" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Person");
        }
    }
}
