﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace depositeProject.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }
    }
}