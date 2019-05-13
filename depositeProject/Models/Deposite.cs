using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string Status { get; set; }
        public int ClientInfoId { get; set; }
        public int DepositeInfoId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime AcceptionDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime AutoRolloverDate { get; set; }
        public double TotalSum { get; set; }
        public double TotalRate { get; set; }
        public string Message { get; set; }
        public virtual ClientInfo ClientInfo { get; set; }
        public virtual DepositeInfo DepositeInfo { get; set; }
        
    }
}