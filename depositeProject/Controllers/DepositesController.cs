using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Description;
using depositeProject.Models;
using iTextSharp.text;
using iTextSharp.text.pdf;


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
        [Route("AcceptedDeposites")]
        public IQueryable<Deposite> GetAcceptedDeposites()
        {
            var acceptedDeposites = db.Deposites
                    .Include(t => t.DepositeInfo)
                    .Include(p => p.ClientInfo);

            return acceptedDeposites.Where(p => p.Status == true);
        }
        [Route("AllDeposites")]
        public IQueryable<Deposite> GetAllDeposites()
        {
            //var allDeposites = 

            return db.Deposites
                    .Include(t => t.DepositeInfo)
                    .Include(p => p.ClientInfo);
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
            var kind = date.Kind;
            return createdTodayDeposites.Where(p => p.CreationDate.Year ==  date.Year && p.CreationDate.Month == date.Month && p.CreationDate.Day == date.Day);
        }

        [Route("Statistics")]
        public Statistics GetStatistics()
        {
            Statistics stat = new Statistics();
            stat.CalculateFrequency();
            return stat;
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
        private string ChangeDateFormat(DateTime s)
        {
            var temp="";
            if (s.Month<10)
            {
                temp = "0" + s.Month;
            } else
            {
                temp = "" + s.Month;
            }
            return s.Day + "." + temp + "." + s.Year;
        }
        private string ChangeСonditionsView(bool info)
        {
            if (info == true)
            {
                return "Передбачено";
            } else
            {
                return "Не передбачено";
            }
            
        }
       
        private bool DepositeExists(int id)
        {
            return db.Deposites.Count(e => e.DepositeId == id) > 0;
        }


        
        [Route("GeneratedСontract")]
        public HttpResponseMessage GetGeneratedСontract(int id)
        {
            Deposite deposite = db.Deposites.Find(id);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\ARIALUNI.TTF", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 14, iTextSharp.text.Font.NORMAL);
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document(PageSize.A4, 10, 10, 10, 10);
            PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);
            document.Open();
            Paragraph title = new Paragraph("\nДEПОЗИТНИЙ ДОГОВІР \n\n", font)
            {
                Alignment = Element.ALIGN_CENTER
            };
            document.Add(title);
            Paragraph para = new Paragraph("Найменування клієнта банку: " + deposite.ClientInfo.Name, font);
            document.Add(para);
            Paragraph para6 = new Paragraph("В особі підприємця: " + deposite.ClientInfo.Representative, font);
            document.Add(para6);
            Paragraph para1 = new Paragraph("Код за ЄДРПОУ/ код ІНН: " + deposite.ClientInfo.IndentificationCode, font);
            document.Add(para1);
            Paragraph para2 = new Paragraph("Місце реєстрації: " + deposite.ClientInfo.RegistrationPlace, font);
            document.Add(para2);
            Paragraph para3 = new Paragraph("Номер телефону " + deposite.ClientInfo.PhoneNumber, font);
            document.Add(para3);
            Paragraph para4 = new Paragraph("Тип депозиту: " + deposite.DepositeInfo.Name, font);
            document.Add(para4);
            Paragraph para5 = new Paragraph("Сума депозиту: " + deposite.AmountOfDeposite, font);
            document.Add(para5);
            Paragraph para7 = new Paragraph("Валюта депозиту: " + deposite.Currency, font);
            document.Add(para7);
            Paragraph para8 = new Paragraph("Дата початку депозитного строку: " + ChangeDateFormat(deposite.StartDepositeDate.ToLocalTime()), font);
            document.Add(para8);
            Paragraph para9 = new Paragraph("Дата закінчення депозитного строку: " + ChangeDateFormat(deposite.EndDepositeDate.ToLocalTime()), font);
            document.Add(para9);
            Paragraph para10 = new Paragraph("Відсоткова ставка: " + deposite.DepositeInfo.Rate + "%", font);
            document.Add(para10);
            Paragraph para11 = new Paragraph("Можливість автопролонгації: " + ChangeСonditionsView(deposite.DepositeInfo.AutoRollover), font);
            document.Add(para11);
            Paragraph para12 = new Paragraph("Можливість поповнення: " + ChangeСonditionsView(deposite.DepositeInfo.PossibilityOfReplenishment), font);
            document.Add(para12);
            Paragraph para13 = new Paragraph("Можливість дострокового розірвання: " + ChangeСonditionsView(deposite.DepositeInfo.PossibilityOfTermination), font);
            document.Add(para13);
            Paragraph para14 = new Paragraph("Рахунок для списання та повернення коштів: " + deposite.ClientInfo.BankAccount, font);
            document.Add(para14);
            Paragraph para15 = new Paragraph("Рахунок для виплати відсотків: " + deposite.ClientInfo.BankAccountForDP, font);
            document.Add(para15);
            Paragraph para17 = new Paragraph(Conditions, font);
            document.Add(para17);
            Paragraph para16 = new Paragraph("Дата:" + ChangeDateFormat(DateTime.Now) + "           Підпис:", font);
            document.Add(para16);
            document.Close();
            memoryStream.Close();
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(memoryStream.ToArray())
            };
            //memoryStream.Close();
            string pdfName = deposite.ClientInfo.Name + "_contract";
            result.Content.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("inline")
                {
                    FileName = pdfName + ".pdf"
                };
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");
            return result;

        }
        [Route("GeneratedStatement")]
        public HttpResponseMessage GetGeneratedStatement(int id)
        {
            Deposite deposite = db.Deposites.Find(id);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\ARIALUNI.TTF", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 14, iTextSharp.text.Font.NORMAL);
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document(PageSize.A4, 10, 10, 10, 10);
            PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);
            document.Open();
            Paragraph title = new Paragraph("\nЗАЯВА НА ВІДКРИТТЯ ДЕПОЗИТУ \n\n", font)
            {
                Alignment = Element.ALIGN_CENTER
            };
            document.Add(title);
            Paragraph para = new Paragraph("Найменування клієнта банку: " + deposite.ClientInfo.Name, font);
            document.Add(para);
            Paragraph para6 = new Paragraph("В особі підприємця: " + deposite.ClientInfo.Representative, font);
            document.Add(para6);
            Paragraph para1 = new Paragraph("Код за ЄДРПОУ/ код ІНН: " + deposite.ClientInfo.IndentificationCode, font);
            document.Add(para1);
            Paragraph para2 = new Paragraph("Місце реєстрації: " + deposite.ClientInfo.RegistrationPlace, font);
            document.Add(para2);
            Paragraph para3 = new Paragraph("Номер телефону " + deposite.ClientInfo.PhoneNumber, font);
            document.Add(para3);
            Paragraph para4 = new Paragraph("Тип депозиту: " + deposite.DepositeInfo.Name, font);
            document.Add(para4);
            Paragraph para5 = new Paragraph("Сума депозиту: " + deposite.AmountOfDeposite, font);
            document.Add(para5);
            Paragraph para7 = new Paragraph("Валюта депозиту: " + deposite.Currency, font);
            document.Add(para7);
            Paragraph para8 = new Paragraph("Дата початку депозитного строку: " + ChangeDateFormat(deposite.StartDepositeDate.ToLocalTime()), font);
            document.Add(para8);
            Paragraph para9 = new Paragraph("Дата закінчення депозитного строку: " + ChangeDateFormat(deposite.EndDepositeDate.ToLocalTime()), font);
            document.Add(para9);
            Paragraph para10 = new Paragraph("Відсоткова ставка: " + deposite.DepositeInfo.Rate+"%", font);
            document.Add(para10);
            Paragraph para11 = new Paragraph("Можливість автопролонгації: " + ChangeСonditionsView(deposite.DepositeInfo.AutoRollover), font);
            document.Add(para11);
            Paragraph para12 = new Paragraph("Можливість поповнення: " + ChangeСonditionsView(deposite.DepositeInfo.PossibilityOfReplenishment), font);
            document.Add(para12);
            Paragraph para13 = new Paragraph("Можливість дострокового розірвання: " + ChangeСonditionsView(deposite.DepositeInfo.PossibilityOfTermination), font);
            document.Add(para13);
            Paragraph para14 = new Paragraph("Рахунок для списання та повернення коштів: " + deposite.ClientInfo.BankAccount, font);
            document.Add(para14);
            Paragraph para15 = new Paragraph("Рахунок для виплати відсотків: " + deposite.ClientInfo.BankAccountForDP, font);
            document.Add(para15);
            
            Paragraph para16 = new Paragraph("Дата:" + ChangeDateFormat(DateTime.Now)+"           Підпис:", font);
            document.Add(para16);
            document.Close();
            memoryStream.Close();
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(memoryStream.ToArray())
            };
             
            string pdfName = deposite.ClientInfo.Name+ "_statement";
            result.Content.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = pdfName + ".pdf"
                };
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");
            return result;

        }
        [Route("GeneratedСlientForm")]
        public HttpResponseMessage GetGeneratedСlientForm(int id)
        {
            Deposite deposite = db.Deposites.Find(id);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\ARIALUNI.TTF", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 14, iTextSharp.text.Font.NORMAL);
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document(PageSize.A4, 10, 10, 10, 10);
            PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);
            document.Open();
            Paragraph title = new Paragraph("\nАнкета клієнта \n\n", font);
            title.Alignment = Element.ALIGN_CENTER;
            document.Add(title);
            Paragraph para = new Paragraph("Найменування клієнта банку: " + deposite.ClientInfo.Name, font);
            document.Add(para);
            Paragraph para6 = new Paragraph("В особі підприємця: " + deposite.ClientInfo.Representative, font);
            document.Add(para6);
            Paragraph para1 = new Paragraph("Код за ЄДРПОУ/ код ІНН: " + deposite.ClientInfo.IndentificationCode, font);
            document.Add(para1);
            Paragraph para2 = new Paragraph("Місце реєстрації: " + deposite.ClientInfo.RegistrationPlace, font);
            document.Add(para2);
            Paragraph para3 = new Paragraph("Номер телефону " + deposite.ClientInfo.PhoneNumber, font);
            document.Add(para3);
            Paragraph para14 = new Paragraph("Рахунок для списання та повернення коштів: " + deposite.ClientInfo.BankAccount, font);
            document.Add(para14);
            Paragraph para15 = new Paragraph("Рахунок для виплати відсотків: " + deposite.ClientInfo.BankAccountForDP, font);
            document.Add(para15);
            Paragraph para16 = new Paragraph("Дата:" + ChangeDateFormat(DateTime.Now) + "           Підпис:", font);
            document.Add(para16);
            document.Close();
            memoryStream.Close();
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(memoryStream.ToArray())
            };
             //memoryStream.Close();
            string pdfName = deposite.ClientInfo.Name + "_clientForm";
            result.Content.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = pdfName + ".pdf"
                };

            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");
            return result;
           
        }
        private readonly string Conditions = "\nПЛАТА ЗА ОПЕРАЦІЙНЕ ОБСЛУГОВУВАННЯ ВКЛАДНОГО РАХУНКУ\n1.1. Договір передбачає договірне списання Банком комісії за перерахування на поточний рахунок Вкладника коштів з Вкладного рахунку(надалі – комісія)." +
                               "\n1.2. В день перерахування суми Вкладу(його частини) з Вкладного рахунку на поточний, Вкладник доручає Банку утримати комісію у гривні в розмірі  0,05 (нуль цілих п’ять сотих)  процента від суми Вкладу(його частини), яка підлягає поверненню Вкладнику.Комісія утримується Банком з суми нарахованих процентів за Вкладом або з суми Вкладу (його частини), яка перераховується на поточний рахунок Вкладника, у випадку якщо суми нарахованих процентів за Вкладом недостатньо для утримання Банком зазначеної комісії." +
                               "\n1.3. Для Вкладів в іноземній валюті, в день перерахування суми Вкладу (його частини) з вкладного рахунку на поточний, Вкладник доручає Банку утримати комісію в розмірі  0,05 (нуль цілих п’ять сотих) процента від суми Вкладу(його частини), яка підлягає поверненню Вкладнику.Комісія утримується Банком з поточного рахунку в національній валюті №2600__/або/2650 у гривні за офіційним курсом НБУ на день здійснення операції." +
                               "\n2. ВІДПОВІДАЛЬНІСТЬ СТОРІН ТА ПОРЯДОК ВИРІШЕННЯ СПОРІВ" +
        "\n2.1.	За невиконання  або несвоєчасне  виконання зобов'язань  по  цьому  Договору  Сторони  несуть відповідальність згідно з чинним законодавством України." +
        "\n2.2. Суперечки, які можуть виникнути між Сторонами, вирішуються шляхом проведення переговорів, а у випадку недосягнення згоди -  у Господарському суді згідно з чинним законодавством України." +
        "\n2.3. Сторони звільняються від відповідальності за повне або часткове невиконання прийнятих на себе за даним Договором зобов'язань, якщо таке невиконання є наслідком обставин непереборної сили, а саме: війн, військових (незалежно від факту оголошення війни) і терористичних дій, блокади, повстання, переворотів, страйків, масового безладу і хвилювань, а також пожежі, землетрусів та інших стихійних лих, що виникли після підписання та безпосередньо вплинули на виконання Договору, а також перебоїв в роботі СЕП НБУ, що спричинили неможливість виконання Банком своїх зобов’язань. При цьому строк виконання зобов'язань за цим Договором продовжується на відповідний строк, протягом якого діяли такі обставини.Якщо ці обставини будуть діяти більш 3 (трьох) місяців, то кожна із Сторін вправі розірвати даний Договір в односторонньому порядку." +
        "\n2.4. За порушення Сторонами вимог чинного законодавства та цього Договору щодо забезпечення зберігання та захисту інформації, що становить банківську таємницю/конфіденційну інформацію, винна сторона несе відповідальність згідно чинного законодавства України." +
        "\n2.5. Банк не несе відповідальності перед Вкладником, Уповноваженими особами Вкладника, його контрагентами за будь-які утримання, санкції, обмеження та інші негативні наслідки щодо Рахунків, грошових коштів та операцій за Рахунками, якщо такі наслідки пов‘язані із виконанням вимог FATCA з боку Податкової служби США, банків-кореспондентів та інших осіб, що приймають участь в переказах, а також за будь-які пов’язані з цим збитки, витрати, моральну шкоду та/або неотримані доходи." +
        "\n3. СТРОК І ПОРЯДОК ДІЇ ДОГОВОРУ" +
        "\n3.1. Договір набирає чинність з дня підписання його належним чином уповноваженими представниками Сторін та укладається на не визначений строк на умовах повернення Вкладу на вимогу Вкладника." +
        "\n4. ЗАКЛЮЧНІ ПОЛОЖЕННЯ" +
                    "\n4.1. У всьому, що не передбачено цим Договором, Сторони керуються чинним законодавством України,нормативними актами НБУ та актами внутрішнього регулювання Банку." +
                    "\n4.2. Підписанням даного Договору Вкладник надає дозвіл Банку подавати відомості про відкриття рахунку в електронному вигляді засобами електронної пошти Національного банку України на адресу Державної податкової адміністрації з використанням засобів захисту інформації НБУ, а також розкривати інформацію, що містить банківську таємницю, в порядку і на умовах, встановлених чинним законодавством України." +
        "\n4.3.	Банк є платником податку на прибуток на загальних умовах, що передбачені Законом України 'Про оподаткування прибутку підприємств'.Вкладник є платником податку на прибуток на загальних умовах, що передбачені Законом України 'Про оподаткування прибутку підприємств',/ або/ " +
        "Вкладник є платником податку на прибуток на на пільгових умовах — з зазначенням норми закону, яка надає цю пільгу." +
        "\n4.4.	Цей Договір укладено українською мовою у двох примірниках, по одному для кожної із Сторін. При цьому обидва примірники мають однакову юридичну силу." +
        "\n4.5.	Вкладник надає Банку право на обробку, використання та передачу третім особам персональних даних про будь-яких фізичних осіб, отриманих у зв’язку з укладенням та  виконанням цього Договору.Одночасно з підписанням цього Договору персональні дані Вкладника вносяться в базу персональних даних, при цьому Вкладник повідомлений про свої права, зазначені в ст. 8 Закону України «Про захист персональних даних», та цілі використання персональних даних." +
        "\n4.6.	Банк під час здійснення своєї діяльності вживає всіх заходів для дотримання вимог FATCA та зареєстрований Податковою службою США зі статусом «Учасника» (Participating FFI). Для виконання вимог FATCA у відносинах Сторін за Договором Банк застосовуватиме положення, передбачені цим Договором\n\n";

    }

}