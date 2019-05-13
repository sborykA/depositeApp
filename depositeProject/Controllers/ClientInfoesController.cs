using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using depositeProject.Models;

namespace depositeProject.Controllers
{
    [RoutePrefix("api/ClientInfoes")]
    public class ClientInfoesController : ApiController
    {
        private UsersDB db = new UsersDB();

        // GET: api/ClientInfoes
        public IQueryable<ClientInfo> GetClientsInfos()
        {
            return db.ClientsInfos;
        }

        // GET: api/ClientInfoes/ipn
        [HttpGet]
        [ResponseType(typeof(ClientInfo))]
        public IHttpActionResult GetClientInfo(string identificationCode)
        {

            ClientInfo clientInfo = db.ClientsInfos.FirstOrDefault(p => p.IndentificationCode == identificationCode);
            if (clientInfo == null)
            {
                return NotFound();
            }
            return Ok(clientInfo);
        }

        // PUT: api/ClientInfoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClientInfo(int id, ClientInfo clientInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clientInfo.Id)
            {
                return BadRequest();
            }

            db.Entry(clientInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientInfoExists(id))
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

        // POST: api/ClientInfoes
        [ResponseType(typeof(ClientInfo))]
        public IHttpActionResult PostClientInfo(ClientInfo clientInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClientsInfos.Add(clientInfo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = clientInfo.Id }, clientInfo);
        }

        // DELETE: api/ClientInfoes/5
        [ResponseType(typeof(ClientInfo))]
        public IHttpActionResult DeleteClientInfo(int id)
        {
            ClientInfo clientInfo = db.ClientsInfos.Find(id);
            if (clientInfo == null)
            {
                return NotFound();
            }

            db.ClientsInfos.Remove(clientInfo);
            db.SaveChanges();

            return Ok(clientInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientInfoExists(int id)
        {
            return db.ClientsInfos.Count(e => e.Id == id) > 0;
        }
        
    }
}