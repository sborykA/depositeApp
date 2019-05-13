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
        public double TotalRate { get; set; }

        private bool IsHoliday(DateTime mydate)
        {
            string[] hds = { "01.01", "07.01", "08.03", "28.04", "29.04", "30.04", "01.05", "09.05", "16.06", "17.06", "28.06", "16.07", "28.07", "24.08", "26.08", "14.10", "25.12", "30.12", "31.12" };

            foreach (var hd in hds)
            {
                if (mydate.Date.ToString("dd.MM", CultureInfo.InvariantCulture) == hd) return true;
            }
            return false;
        }
        private static bool IsWeekEnd(DateTime date)
        {
            if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
            {
                return true;
            }
            else
            {
                return false;
            }
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
                return MonthDifference(endDate, startDate) / 4;
            }

        }
        private double SumOfRate(string depositeType, DateTime startDate, DateTime endDate, int amountOfDeposite, int rate)
        {
            int term = (endDate.Date - startDate.Date).Days;
            if (depositeType == "Депозит на вимогу")
            {

                return Math.Round(((double)amountOfDeposite * ((double)rate / (double)100) * (double)term) / VisYear(DateTime.Now.Year), 2);
            }
            else
            //if(depositeType == "Депозит стандартний")
            {

                double monthRate = Math.Round(((double)rate / (double)100) * (double)term / VisYear(DateTime.Now.Year), 4);
                if (NumberOfDepositPeriods(startDate, endDate, CapitalizationType.EveryMonth) == 0)
                {
                    return Math.Round((double)amountOfDeposite * (1 + monthRate) - amountOfDeposite, 2);
                }
                else
                {
                    return Math.Round((double)amountOfDeposite * Math.Pow((1 + monthRate), NumberOfDepositPeriods(startDate, endDate, CapitalizationType.EveryMonth)) - amountOfDeposite, 2);

                }
            }
        }
        public void GetTotalRate(string depositeType, DateTime startDate, DateTime endDate, int amountOfDeposite, int rate)
        {
            this.TotalRate = SumOfRate(depositeType, startDate, endDate, amountOfDeposite, rate);
        }
        public void GetTotalSum(string depositeType, DateTime startDate, DateTime endDate, int amountOfDeposite, int rate)
        {
            GetTotalRate(depositeType, startDate, endDate, amountOfDeposite, rate);
            this.TotalSum = this.TotalRate + amountOfDeposite;
        }
        private DateTime GetNextWorkingDay(DateTime date)
        {
            do
            {
                date = date.AddDays(1);
            } while (IsHoliday(date) || IsWeekEnd(date));
            return date;
        }
        public void GetPaymentDate(DateTime endDate)
        {
            if (IsHoliday(endDate) != true && !IsWeekEnd(endDate))
            {
                this.PaymentDate = endDate;
            }
            else
            {
                this.PaymentDate = GetNextWorkingDay(endDate);
            }

        }
    }
}