using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;


namespace depositeProject.Models
{
    public class Statistics
    {
        private UsersDB db = new UsersDB();
        
        public List<string> Labels { get; set; }
        public List<double> Data { get; set; }

       public void CalculateFrequency()
        {
            Statistics stat = new Statistics();
            Labels = new List<string> { };
            Data = new List<double> { };


            IEnumerable <Deposite> allDeposites = db.Deposites
                    .Include(t => t.DepositeInfo)
                    .Include(p => p.ClientInfo);

            IEnumerable<DepositeInfo> depositesInfoes = db.DepositeInfoes;
            foreach (DepositeInfo d in depositesInfoes)
            {
                if (Labels.IndexOf(d.Name) == -1)
                {
                    Labels.Add(d.Name);
                }
            }
            int[] counters = new int[Labels.Count];
            foreach (Deposite d in allDeposites)
            {
                for (int i = 0; i < Labels.Count; i++)
                {
                    if (Labels[i] == d.DepositeInfo.Name)
                    {
                        counters[i]++;
                    }
                }
            }
            int totalCount = allDeposites.Count();
            for(int i=0; i< Labels.Count; i++)
            {
                Data.Add(Math.Round((double)counters[i] / totalCount,3));
            }

        }
    }
}