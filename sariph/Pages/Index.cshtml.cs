using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using sariph.Data;
using sariph.Model;

namespace sariph.Pages
{
    public class IndexModel : PageModel
    {
        public IEnumerable<ProjectTile> Projects { get; set; }

        public void OnGet()
        {
            Projects = ProjectRepository.GetTiles();
        }

        public string GetTileClass(ProjectTile tile)
        {
            if (tile.HideLabel)
            {
                return "tile hide-name";
            }
            else
            {
                return "tile";
            }
        }

        public string GetTileStyle(ProjectTile tile)
        {
            string bgImg = tile.BackgroundImage == null ? null : $"url({tile.BackgroundImage})";
            return $"background-color: {tile.BackgroundColor}; background-image: {bgImg}";
        }
    }
}
