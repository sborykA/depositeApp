using System.Data.Entity;


namespace depositeProject.Models
{
    public class UsersDB : DbContext
    {
        /*public UsersDB():
            base("OracleConnection")
        { }*/
        public DbSet<User> Users { get; set; }
        public DbSet<ClientInfo> ClientsInfos { get; set; }
        public DbSet<Deposite> Deposites { get; set; }
        public DbSet<DepositeInfo> DepositeInfoes { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClientInfo>()
               .HasOptional(s => s.Deposite) // Mark Address property optional in Student entity
               .WithRequired(ad => ad.ClientInfo);
            modelBuilder.Entity<DepositeInfo>()
              .HasOptional(s => s.Deposite) // Mark Address property optional in Student entity
              .WithRequired(ad => ad.DepositeInfo);



        }
    }
}