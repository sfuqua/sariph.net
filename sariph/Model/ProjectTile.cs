namespace sariph.Model
{
    public sealed class ProjectTile
    {
        private string projectId;

        /// <summary>
        /// The project's name.
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Used for routing.
        /// </summary>
        public string ProjectId
        {
            get => this.projectId ?? Label;
            set => this.projectId = value;
        }

        /// <summary>
        /// Whether displaying <see cref="Label"/> on a tile should be deferred
        /// until mouseover.
        /// </summary>
        public bool HideLabel { get; set; } = false;

        /// <summary>
        /// Optional background color for the tile.
        /// </summary>
        public string BackgroundColor { get; set; }

        /// <summary>
        /// Optional background image for the tile.
        /// </summary>
        public string BackgroundImage { get; set; }
    }
}