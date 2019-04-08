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
            AutomaticMigrationsEnabled = false;
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
                Type = "front"
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
                            PhoneNumber = "+380681234567",
                            BankAccount="4149684368346702",
                            BankAccountForDP= "4149684368346702"
                        },
                        new Models.ClientInfo
                        {
                            IndentificationCode = "inn2",
                            Name = "name2",
                            Representative = "REPRESENTATIVE2",
                            RegistrationPlace = "Kyiv",
                            PhoneNumber = "+380681239876",
                            BankAccount = "5156345681230893",
                            BankAccountForDP = "5156345681230893"
                        }

                    );
            context.DepositeInfoes.AddOrUpdate(
                m => m.Id,
            new Models.DepositeInfo
            {
                Name = "Депозит з можливістю поповнення",
                Rate = 3,
                AutoRollover = true,
                PossibilityOfReplenishment = true,
                PossibilityOfTermination = false
            },
            new Models.DepositeInfo
            {
                Name = "Депозит стандартний",
                Rate = 7,
                AutoRollover = false,
                PossibilityOfReplenishment = false,
                PossibilityOfTermination = true
            }
            );
        }
    }
}
