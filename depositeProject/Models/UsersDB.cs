using System.Data.Entity;


namespace depositeProject.Models
{
    public class UsersDB:DbContext
    {
        /*public UsersDB():
            base("OracleConnection")
        { }*/
        public DbSet<User> Users { get; set; }
        public DbSet<ClientInfo> ClientsInfos { get; set; }
        /*public DbSet<Deposite> Deposites { get; set; }
        public DbSet<DepositeInfo> DepositeInfoes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Deposite>()
            .HasKey(t => t.DepositeId);

            // Map one-to-zero or one relationship
            
            modelBuilder.Entity<Deposite>().HasRequired(x => x.Client)
               .WithMany();

            modelBuilder.Entity<ClientInfo>().HasRequired(x => x.Deposite)
               .WithMany()
               .HasForeignKey(x => x.DepositeId);
            modelBuilder.Entity<Deposite>().HasRequired(x => x.DepositeInfo)
               .WithMany();

            modelBuilder.Entity<DepositeInfo>().HasRequired(x => x.Deposite)
               .WithMany()
               .HasForeignKey(x => x.DepositeId);

            base.OnModelCreating(modelBuilder);
        }*/
    }
}