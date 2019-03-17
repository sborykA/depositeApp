using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace depositeProject.Models
{
    public class Deposite
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DepositeId { get; set; }
        public DateTime StartDepositeDate { get; set; }
        public DateTime EndDepositeDate { get; set; }
        public int AmountOfDeposite { get; set; }
        public string Currency { get; set; }
        public bool Status { get; set; }
        public virtual ClientInfo ClientInfo { get; set; }
        public virtual DepositeInfo DepositeInfo { get; set; }
    }
}