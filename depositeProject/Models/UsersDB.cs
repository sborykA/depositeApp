
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;


namespace depositeProject.Models
{
    public class UsersDB : DbContext
    {
        public UsersDB() :base("OracleDbContext")
        {
           
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<UsersDB, Configuration>("OracleDbContext"));
        }
        /*public UsersDB() :base("DefaultConnection");
        { }*/
        public DbSet<User> Users { get; set; }
        public DbSet<ClientInfo> ClientsInfos { get; set; }
        public DbSet<Deposite> Deposites { get; set; }
        public DbSet<DepositeInfo> DepositeInfoes { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("DEPOSITE");
            modelBuilder.Properties()
                .Where(p => p.PropertyType == typeof(string) &&
                    p.GetCustomAttributes(typeof(System.ComponentModel.DataAnnotations.MaxLengthAttribute), false).Length == 0)
        .Configure(p => p.HasMaxLength(2000));
            Database.SetInitializer<UsersDB>(new DropCreateDatabaseIfModelChanges<UsersDB>());
            modelBuilder.Entity<ClientInfo>()
               .HasOptional(s => s.Deposite); // Mark Address property optional in Student entity

            modelBuilder.Entity<DepositeInfo>()
              .HasOptional(s => s.Deposite); 

            modelBuilder.Entity<Deposite>().HasRequired(t => t.ClientInfo)
            .WithMany()
            .HasForeignKey(t => t.ClientInfoId)
            .WillCascadeOnDelete(false);

            modelBuilder.Entity<Deposite>().HasRequired(t => t.DepositeInfo)
            .WithMany()
            .HasForeignKey(t => t.DepositeInfoId)
            .WillCascadeOnDelete(false);
            /*modelBuilder.Entity<ClientInfo>().HasKey(x => x.Id);
            modelBuilder.Entity<ClientInfo>().Property(x => x.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<ClientInfo>().HasOptional(x => x.Deposite)
                .WithOptionalPrincipal(l => l.ClientInfo);
            modelBuilder.Entity<Deposite>().HasKey(x => x.DepositeId);
            modelBuilder.Entity<Deposite>().Property(x => x.DepositeId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<DepositeInfo>().HasKey(x => x.Id);
            modelBuilder.Entity<DepositeInfo>().Property(x => x.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<DepositeInfo>().HasOptional(x => x.Deposite)
                .WithOptionalPrincipal(l => l.DepositeInfo);*/
            /*modelBuilder.Entity<ClientInfo>()
               .HasOptional(s => s.Deposite) // Mark Address property optional in Student entity
               .WithRequired(ad => ad.ClientInfo);
            modelBuilder.Entity<DepositeInfo>()
              .HasOptional(s => s.Deposite) // Mark Address property optional in Student entity
              .WithRequired(ad => ad.DepositeInfo);*/



        }
    }
}