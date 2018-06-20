using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace sariph.Controllers
{
    [Route("api")]//, Produces("application/json")]
    public class ApiController : Controller
    {
        [HttpGet("")]
        public object Index()
        {
            return View("Projects/Citrine");
        }
    }
}