using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace depositeProject.Models
{
    public class DepositeInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rate { get; set; }
        public bool AutoRollover { get; set; }
        public bool PossibilityOfReplenishment { get; set; }
        public bool PossibilityOfTermination { get; set; }
        [ForeignKey("Deposite")]
        public int? DepositeId { get; set; }
        public Deposite Deposite { get; set; }
    }
}