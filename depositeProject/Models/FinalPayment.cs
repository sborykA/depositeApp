using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace depositeProject.Models
{
    public class FinalPayment
    {
        public double TotalSum { get; set; }
        public DateTime PaymentDate { get; set; }
        private double TotalRate { get; set; }
        
        private bool Holiday(DateTime mydate)
        {
            string[] hds = { "01.01", "07.01", "08.03", "28.04", "01.05", "09.05", "16.06", "28.06", "16.07", "28.07", "24.08", "14.10", "25.12" };

            foreach (var hd in hds)
            {
                if (mydate.Date.ToString("dd.MM", CultureInfo.InvariantCulture) == hd) return (true);
            }
            return (false);
        }
        private int VisYear(int year)
        {
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
            {
                return 366;
            }
            else
            {
                return 365;
            }
        }
        private int MonthDifference(DateTime lValue, DateTime rValue)
        {
            return (lValue.Month - rValue.Month) + 12 * (lValue.Year - rValue.Year);
        }
        private int NumberOfDepositPeriods(DateTime startDate, DateTime endDate, CapitalizationType c)
        {
            if (c == CapitalizationType.EveryMonth)
            {
                return MonthDifference(endDate, startDate);
            }
            else
            {
                return MonthDifference(endDate, startDate)/4;
            }
            
        }
        private double SumOfRate(string depositeType, DateTime startDate, DateTime endDate, int amountOfDeposite, int rate)
        {
            int term = (endDate.Date - startDate.Date).Days - 1;
            if (depositeType == "Депозит з можливістю поповнення")
            {
                return (amountOfDeposite*rate*term)/ VisYear(DateTime.Now.Year);
            }
            else
            //if(depositeType == "Депозит стандартний")
            {
                double monthRate = rate * term / VisYear(DateTime.Now.Year);
                return amountOfDeposite * Math.Pow((1 + monthRate), NumberOfDepositPeriods(startDate,endDate,CapitalizationType.EveryMonth)) - amountOfDeposite;
            }   
        }
        private void getTotalRate(string depositeType, DateTime startDate, DateTime endDate, int amountOfDeposite, int rate)
        {
            this.TotalRate=SumOfRate(depositeType, startDate, endDate, amountOfDeposite, rate);
        }
        public void getTotalSum(string depositeType, DateTime startDate, DateTime endDate, int amountOfDeposite, int rate)
        {
            getTotalRate(depositeType, startDate, endDate, amountOfDeposite, rate);
            this.TotalSum =  this.TotalRate+ amountOfDeposite;
        }
    }
}