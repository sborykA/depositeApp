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
            /*deposite = db.Deposites
                    .Include(t => t.DepositeInfo)
                    .Include(p => p.ClientInfo)
                    .FirstOrDefault();*/
            
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