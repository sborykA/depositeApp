
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;


namespace depositeProject.Models
{
    public class UsersDB : DbContext
    {
        public UsersDB() :base("OracleDbContext"){ }
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
               .HasOptional(s => s.Deposite); 

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
        }
    }
}