﻿using System;
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
        public string BankAccount { get; set; }
        public DateTime ChangeDate { get; set; }
        public string BankAccountForDP { get; set; }
        public virtual Deposite Deposite { get; set; }
    }
}