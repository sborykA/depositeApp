using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;


namespace depositeProject.Models
{
    public class UsersDB:DbContext
    {
        /*public UsersDB():
            base("OracleConnection")
        { }*/
        public DbSet<User> Users { get; set; }
        public DbSet<ClientInfo> ClientsInfos { get; set; }
    }
}