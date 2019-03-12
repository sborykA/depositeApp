namespace depositeProject.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<depositeProject.Models.UsersDB>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(depositeProject.Models.UsersDB context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            context.Users.AddOrUpdate(
                m => m.Id,
            new Models.User
      {
                
          Id = 1,
          Login = "user1",
          Password = "user1",
          Type="front"
      },
       new Models.User
       {
           Id = 2,
           Login = "user2",
           Password = "user2",
           Type = "back"
       }
        );
            context.ClientsInfos.AddOrUpdate(
                            m => m.Id,
                        new Models.ClientInfo
                        {

                            Id = 1,
                            Ipn = "ipn1",
                            Name = "name1",
                            DepositType = "urgent",
                            RegistrationPlace="Kyiv",
                            EAName="Eaname",
                            EACode="000000",
                            StartDepositeDate= new DateTime(2019, 7, 20),
                            EndDepositeDate= new  DateTime(2019, 8, 15)
                        }
                    );
        }
    }
}
