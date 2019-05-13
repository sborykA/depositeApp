namespace depositeProject.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Models.UsersDB>
    {
       
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Models.UsersDB context)
        {
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
                            IndentificationCode = "3604234657",
                            Name = "ТОВ Квіточка",
                            Representative = "Іванов І.І",
                            RegistrationPlace = "Київ",
                            PhoneNumber = "+380681234567",
                            BankAccount = "4149684368346702",
                            BankAccountForDP = "4149684368346702",
                            ChangeDate = new DateTime(2015, 7, 20)
                        },
                        new Models.ClientInfo
                        {
                            IndentificationCode = "459670043",
                            Name = "ТОВ Альянс",
                            Representative = "Петров П.П",
                            RegistrationPlace = "Київ",
                            PhoneNumber = "+380681239876",
                            BankAccount = "5156345681230893",
                            BankAccountForDP = "5156345681230893",
                            ChangeDate = new DateTime(2015, 7, 20)
                        }

                    );
            context.DepositeInfoes.AddOrUpdate(
                m => m.Id,
            new Models.DepositeInfo
            {
                Name = "Депозит на вимогу",
                Rate = 12,
                AutoRollover = true,
                PossibilityOfReplenishment = false,
                PossibilityOfTermination = false
            },
            new Models.DepositeInfo
            {
                Name = "Депозит з капіталізацією відсотків",
                Rate = 4,
                AutoRollover = false,
                PossibilityOfReplenishment = false,
                PossibilityOfTermination = true
            }
            );
        }
    }
}
