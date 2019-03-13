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
        public bool Status { get; set; }
 
        public ClientInfo Client { get; set; }
        public DepositeInfo DepositeInfo { get; set; }
    }
}