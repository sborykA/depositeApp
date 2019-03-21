using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using depositeProject.Models;

namespace depositeProject.Controllers
{
    [RoutePrefix("api/Deposites")]
    public class DepositesController : ApiController
    {
        private UsersDB db = new UsersDB();
        //return all unaccepted deposites
        // GET: api/Deposites
        public IQueryable<Deposite> GetDeposites()
        {
            var unacceptedDeposites = db.Deposites
                    .Include(t => t.DepositeInfo)
                    .Include(p => p.ClientInfo);
                   
            return unacceptedDeposites.Where(p => p.Status == false);
        }
        [Route("ConfirmedTodayDeposites")]
        public IQueryable<Deposite> GetConfirmedTodayDeposites(DateTime date)
        {
           
             var confirmedTodayDeposites = db.Deposites
                    .Include(t => t.DepositeInfo)
                    .Include(p => p.ClientInfo);

            return confirmedTodayDeposites.Where(p => p.AcceptionDate.Year  == date.Year && p.AcceptionDate.Month==date.Month && p.AcceptionDate.Day==date.Day );
        }
        [Route("CreatedTodayDeposites")]
        public IQueryable<Deposite> GetCreatedTodayDeposites(DateTime date)
        {
            var createdTodayDeposites = db.Deposites
                    .Include(t => t.DepositeInfo)
                    .Include(p => p.ClientInfo);

            return createdTodayDeposites.Where(p => p.CreationDate.Year ==  date.Year && p.CreationDate.Month == date.Month && p.CreationDate.Year == date.Year);
        }

        // GET: api/Deposites/5
        [ResponseType(typeof(Deposite))]
        public IHttpActionResult GetDeposite(int id)
        {
            Deposite deposite = db.Deposites.Find(id);
            if (deposite == null)
            {
                return NotFound();
            }

            return Ok(deposite);
        }

        // PUT: api/Deposites/5
        [HttpPut]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDeposite(int id, Deposite deposite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deposite.DepositeId)
            {
                return BadRequest();
            }

            db.Entry(deposite).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepositeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Deposites
        [ResponseType(typeof(Deposite))]
        public IHttpActionResult PostDeposite(Deposite deposite)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Deposites.Add(deposite);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = deposite.DepositeId }, deposite);
        }

        // DELETE: api/Deposites/5
        [ResponseType(typeof(Deposite))]
        public IHttpActionResult DeleteDeposite(int id)
        {
            Deposite deposite = db.Deposites.Find(id);
            if (deposite == null)
            {
                return NotFound();
            }

            db.Deposites.Remove(deposite);
            db.SaveChanges();

            return Ok(deposite);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DepositeExists(int id)
        {
            return db.Deposites.Count(e => e.DepositeId == id) > 0;
        }
    }
}