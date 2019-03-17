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
                
          
          Login = "user1",
          Password = "user1",
          Type="front"
      },
       new Models.User
       {
           
           Login = "user2",
           Password = "user2",
           Type = "back"
       }
        );
            context.ClientsInfos.AddOrUpdate(
                            m => m.Id,
                        new Models.ClientInfo
                        {

                            
                            IndentificationCode = "inn1",
                            Name = "name1",
                            Representative = "REPRESENTATIVE1",
                            RegistrationPlace = "Kyiv",
                            PhoneNumber = "+38(068)1234567"
                            /*,
                            StartDepositeDate= new DateTime(2019, 7, 20),
                            EndDepositeDate= new  DateTime(2019, 8, 15)*/
                        }
                    );
            context.DepositeInfoes.AddOrUpdate(
                m => m.Id,
            new Models.DepositeInfo
            {
                Name = "������� � ��������� ����������",
                Rate = 5,
                AutoRollover = true,
                PossibilityOfReplenishment = true,
                PossibilityOfTermination = false
            },
            new Models.DepositeInfo
            {
                Name = "������� �����������",
                Rate = 7,
                AutoRollover = false,
                PossibilityOfReplenishment = false,
                PossibilityOfTermination = true
            }
            );
        }
    }
}
