﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace PleaseBuy.Areas.Identity.Data;

// Add profile data for application users by adding properties to the PleaseBuyUser class
public class PleaseBuyUser : IdentityUser
{
    public string? PhoneNumber { get; set; }
}

