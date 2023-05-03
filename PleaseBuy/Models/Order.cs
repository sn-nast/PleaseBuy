using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Asn1.Cms;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace PleaseBuy.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string OrderId { get; set; } = default!;

        [DataType(DataType.DateTime)]
        public DateTime Time { get; set; }

        public string TimeLimit { get; set; }

        [DefaultValue("")]
        public string Owner { get; set; }

        public string Canteen { get; set; }

        [DefaultValue("")]
        public string Depositor { get; set; }

        public string PhoneNumber { get; set; }

        public string Location { get; set; }

        [DefaultValue("")]
        public string Annotation { get; set; }

        [DefaultValue(false)]
        public bool Confirmed { get; set; }

        [DefaultValue(false)]
        public bool Prepared { get; set; }

        [DefaultValue(false)]
        public bool Delivery { get; set; }

        [DefaultValue(false)]
        public bool Completed { get; set; }

        [DefaultValue(false)]
        public bool Canceled { get; set; }

        [DefaultValue(false)]
        public bool CancelConfirmed { get; set; }


    }   
}
