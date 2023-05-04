using System.ComponentModel.DataAnnotations;

namespace PleaseBuy.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        
        public string CartId { get; set; }

        public string Menu { get; set; }
        
        public int Price { get; set; }

        public int Amount { get; set; }
        
        public string Annotation { get; set; }

        public string Canteen { get; set; }
        
        public string Owner { get; set; }

        public string Restaurant { get; set; }

    }
}
