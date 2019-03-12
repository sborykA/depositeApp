using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace depositeProject.Models
{
    public class ClientInfo
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Ipn { get; set; }
            public string DepositType { get; set; }
            public string RegistrationPlace { get; set; }
            public string EAName { get; set; }
            public string EACode { get; set; }
            public DateTime StartDepositeDate { get; set; }
            public DateTime EndDepositeDate { get; set; }
        //public DateTime ReleaseDate { get; set; }

    }
}