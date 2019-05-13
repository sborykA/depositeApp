namespace depositeProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migration1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "DEPOSITE.ClientInfoes",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 10, scale: 0, identity: true),
                        Name = c.String(maxLength: 2000),
                        Representative = c.String(maxLength: 2000),
                        IndentificationCode = c.String(maxLength: 2000),
                        RegistrationPlace = c.String(maxLength: 2000),
                        PhoneNumber = c.String(maxLength: 2000),
                        BankAccount = c.String(maxLength: 2000),
                        ChangeDate = c.DateTime(nullable: false),
                        BankAccountForDP = c.String(maxLength: 2000),
                        Deposite_DepositeId = c.Decimal(precision: 10, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("DEPOSITE.Deposites", t => t.Deposite_DepositeId)
                .Index(t => t.Deposite_DepositeId);
            
            CreateTable(
                "DEPOSITE.Deposites",
                c => new
                    {
                        DepositeId = c.Decimal(nullable: false, precision: 10, scale: 0, identity: true),
                        StartDepositeDate = c.DateTime(nullable: false),
                        EndDepositeDate = c.DateTime(nullable: false),
                        AmountOfDeposite = c.Decimal(nullable: false, precision: 10, scale: 0),
                        Currency = c.String(maxLength: 2000),
                        Status = c.String(maxLength: 2000),
                        ClientInfoId = c.Decimal(nullable: false, precision: 10, scale: 0),
                        DepositeInfoId = c.Decimal(nullable: false, precision: 10, scale: 0),
                        CreationDate = c.DateTime(nullable: false),
                        AcceptionDate = c.DateTime(nullable: false),
                        PaymentDate = c.DateTime(nullable: false),
                        AutoRolloverDate = c.DateTime(nullable: false),
                        TotalSum = c.Double(nullable: false),
                        TotalRate = c.Double(nullable: false),
                        Message = c.String(maxLength: 2000),
                    })
                .PrimaryKey(t => t.DepositeId)
                .ForeignKey("DEPOSITE.ClientInfoes", t => t.ClientInfoId)
                .ForeignKey("DEPOSITE.DepositeInfoes", t => t.DepositeInfoId)
                .Index(t => t.ClientInfoId)
                .Index(t => t.DepositeInfoId);
            
            CreateTable(
                "DEPOSITE.DepositeInfoes",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 10, scale: 0, identity: true),
                        Name = c.String(maxLength: 2000),
                        Rate = c.Decimal(nullable: false, precision: 10, scale: 0),
                        AutoRollover = c.Decimal(nullable: false, precision: 1, scale: 0),
                        PossibilityOfReplenishment = c.Decimal(nullable: false, precision: 1, scale: 0),
                        PossibilityOfTermination = c.Decimal(nullable: false, precision: 1, scale: 0),
                        Deposite_DepositeId = c.Decimal(precision: 10, scale: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("DEPOSITE.Deposites", t => t.Deposite_DepositeId)
                .Index(t => t.Deposite_DepositeId);
            
            CreateTable(
                "DEPOSITE.Users",
                c => new
                    {
                        Id = c.Decimal(nullable: false, precision: 10, scale: 0, identity: true),
                        Login = c.String(maxLength: 2000),
                        Password = c.String(maxLength: 2000),
                        Type = c.String(maxLength: 2000),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("DEPOSITE.ClientInfoes", "Deposite_DepositeId", "DEPOSITE.Deposites");
            DropForeignKey("DEPOSITE.Deposites", "DepositeInfoId", "DEPOSITE.DepositeInfoes");
            DropForeignKey("DEPOSITE.DepositeInfoes", "Deposite_DepositeId", "DEPOSITE.Deposites");
            DropForeignKey("DEPOSITE.Deposites", "ClientInfoId", "DEPOSITE.ClientInfoes");
            DropIndex("DEPOSITE.DepositeInfoes", new[] { "Deposite_DepositeId" });
            DropIndex("DEPOSITE.Deposites", new[] { "DepositeInfoId" });
            DropIndex("DEPOSITE.Deposites", new[] { "ClientInfoId" });
            DropIndex("DEPOSITE.ClientInfoes", new[] { "Deposite_DepositeId" });
            DropTable("DEPOSITE.Users");
            DropTable("DEPOSITE.DepositeInfoes");
            DropTable("DEPOSITE.Deposites");
            DropTable("DEPOSITE.ClientInfoes");
        }
    }
}
