using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace depositeProject.Models
{
    public class ClientInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Representative { get; set; }
        public string IndentificationCode { get; set; }
        public string RegistrationPlace { get; set; }
        public string PhoneNumber { get; set; }
        public virtual Deposite Deposite { get; set; }
        /*[ForeignKey("Deposite")]
        public int? DepositeId { get; set; }
        public Deposite Deposite { get; set; }*/
        //public DateTime ReleaseDate { get; set; }

    }
}