using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class WorkUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Works",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Works_UserId",
                table: "Works",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Works_AspNetUsers_UserId",
                table: "Works",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Works_AspNetUsers_UserId",
                table: "Works");

            migrationBuilder.DropIndex(
                name: "IX_Works_UserId",
                table: "Works");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Works");
        }
    }
}
