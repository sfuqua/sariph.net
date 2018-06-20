using System.Collections.Generic;

namespace sariph.Model
{
    public sealed class ProjectDetails
    {
        /// <summary>
        /// The project's name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// URL for project details.
        /// </summary>
        public string DetailsUrl { get; set; }

        /// <summary>
        /// Label for project details link.
        /// </summary>
        public string DetailsText { get; set; }

        /// <summary>
        /// Description of the project, in paragraphs.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Tech used for the project.
        /// </summary>
        public IEnumerable<string> Technologies { get; set; }

        /// <summary>
        /// Challenges/highlights of working on the project.
        /// </summary>
        public IEnumerable<string> Challenges { get; set; }
    }
}