using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using sariph.Data;
using sariph.Model;

namespace sariph.Pages
{
    public class ProjectsModel : PageModel
    {
        public ProjectDetails Project { get; set; }

        public void OnGet(string id)
        {
            Project = ProjectRepository.GetProject(id);
        }
    }
}