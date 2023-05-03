using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PleaseBuy.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime", nullable: false),
                    TimeLimit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Owner = table.Column<string>(type: "nvarchar(100)", defaultValue: " ", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Canteen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Depositor = table.Column<string>(type: "nvarchar(100)", defaultValue: " ", nullable: false),
                    Annotation = table.Column<string>(type: "nvarchar(max)", defaultValue: " ", nullable: false),
                    Confirmed = table.Column<bool>(type: "bit", defaultValue: false, nullable: false),
                    Prepared = table.Column<bool>(type: "bit", defaultValue: false, nullable: false),
                    Delivery = table.Column<bool>(type: "bit", defaultValue: false, nullable: false),
                    Completed = table.Column<bool>(type: "bit", defaultValue: false, nullable: false),
                    Canceled = table.Column<bool>(type: "bit", defaultValue: false, nullable: false),
                    CancelConfirmed = table.Column<bool>(type: "bit", defaultValue: false, nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
