using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using depositeProject.Models;

namespace depositeProject.Controllers
{
    public class DepositeInfoesController : ApiController
    {
        private UsersDB db = new UsersDB();

        // GET: api/DepositeInfoes
        public IQueryable<DepositeInfo> GetDepositeInfoes()
        {
            return db.DepositeInfoes;
        }

        // GET: api/DepositeInfoes/5
        [ResponseType(typeof(DepositeInfo))]
        public IHttpActionResult GetDepositeInfo(int id)
        {

            DepositeInfo depositeInfo = db.DepositeInfoes.Find(id);
            if (depositeInfo == null)
            {
                return NotFound();
            }

            return Ok(depositeInfo);
        }

        // PUT: api/DepositeInfoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDepositeInfo(int id, DepositeInfo depositeInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != depositeInfo.Id)
            {
                return BadRequest();
            }

            db.Entry(depositeInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepositeInfoExists(id))
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

        // POST: api/DepositeInfoes
        [ResponseType(typeof(DepositeInfo))]
        public IHttpActionResult PostDepositeInfo(DepositeInfo depositeInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DepositeInfoes.Add(depositeInfo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = depositeInfo.Id }, depositeInfo);
        }

        // DELETE: api/DepositeInfoes/5
        [ResponseType(typeof(DepositeInfo))]
        public IHttpActionResult DeleteDepositeInfo(int id)
        {
            DepositeInfo depositeInfo = db.DepositeInfoes.Find(id);
            if (depositeInfo == null)
            {
                return NotFound();
            }

            db.DepositeInfoes.Remove(depositeInfo);
            db.SaveChanges();

            return Ok(depositeInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DepositeInfoExists(int id)
        {
            return db.DepositeInfoes.Count(e => e.Id == id) > 0;
        }
    }
}