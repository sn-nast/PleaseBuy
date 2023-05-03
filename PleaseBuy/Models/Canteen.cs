using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace PleaseBuy.Models
{
    [Keyless]
    public class Canteen
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Restaurant { get; set; }

        public string? Menu { get; set; }

        public int Price { get; set; }
    }
}
