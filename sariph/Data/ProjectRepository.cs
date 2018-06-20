using sariph.Model;
using System.Collections.Generic;

namespace sariph.Data
{
    public static class ProjectRepository
    {
        private static readonly Dictionary<string, ProjectDetails> Projects =
            new Dictionary<string, ProjectDetails>
            {
                { "Citrine", new ProjectDetails
                    {
                        Name = "Citrine",
                        DetailsUrl = "https://bitbucket.org/sapph/citrine",
                        DetailsText = "Bitbucket",
                        Description = "Citrine is a networking library I started a view years ago to help ramp " +
                        "up on C#, and also because I couldn't find a similar solution at the time. It solves " +
                        "two primary goals: provide a flexible, event-driven, Socket-based networking framework, " +
                         "and learn about networking in .NET, especially the 'new' paradigm introduced in .NET " +
                         "3.5.\n" +

                        "First and foremost, I wanted a client-server library that provided events for important " +
                        "scenarios, like gaining or losing a client, and when reading/writing a byte array was " +
                        "complete. On top of this, I introduced the idea of 'Protocols'. A protocol gives " +
                        "meaning to a byte array by abstracting it away. In the base library, I provide " +
                        "a string-based LineReceiver Protocol as well as a protobuf serialization Protocol.\n" +

                        "In addition to Protocols, the actual TCP networking is abstracted through the idea of " +
                        "Transports, which are simply a means of conveying bytes between two endpoints. " +
                        "Protocols exist on top of Transports, and the TCP server and client in Citrine are " +
                        "implementations of the Transport abstraction.\n" +

                        "The project taught me a lot about how networking ia handled in .NET, in addition " +
                        "to providing valuable experience in designing a library from the ground up. It was " +
                        "also the first personal project of mine with its own test suite, and writing the tests " +
                        "was a great learning experience.",
                        Technologies = new List<string>
                        {
                            "C#",
                            ".NET 3.5 sockets"
                        },
                        Challenges = new List<string>
                        {
                            "Multithreaded programming",
                            "New API with few examples or documentation",
                            "Clean library design",
                            "Designing automated tests for a network API"
                        },
                    }
                },
                {
                    "Wardrobe", new ProjectDetails
                    {
                        Name = "League of Legends Wardrobe",
                        DetailsUrl = "https://bitbucket.org/sapph/league-wardrobe",
                        DetailsText = "Bitbucket",
                        Description = "NOTE - this project is on indefinite hold due to major changes to how " +
                        "League of Legends handles item set data (Riot also implemented a similar interface " +
                        "in the official game client).\n" +
                        "The LoL Wardrobe was a project I used primarily to learn WPF and tinker with " +
                        "scraping websites. It's a little known fact that the game " +
                        "<a href='http://www.leagueoflegends.com/'>League of Legends</a> used to provide an API of " +
                        "sorts for customizing the 'Recommended' item loadout each champion sees in-game. " +
                        "This was handled through the use of INI files in the LoL data directory.\n" +

                        "The project provided numerous interesting challenges. First of all, locating the " +
                        "data directory itself. LoL has a default install location, which I try first. Failing " +
                        "that, the installer sometimes sets a registry key with the directory's location. " +
                        "I consult that, or finally, prompt the user for the location and fail cleanly if need " +
                        "be. The directory requires a very specific structure, with a changing version number " +
                        "in the middle of the path. I had to account for this, and, again, fail cleanly if " +
                        "one of any number of things goes wrong.\n" +

                        "Once the app has a hold of where to read/write data, it needs to populate its database " +
                        "of champions and items from the game. Other people solving the same problem provide " +
                        "dropbox links with text files, or implement a web service to keep the program up to " +
                        "up to date. My solution was to scrape the game's official website, which I've noticed " +
                        "is well maintained and cleanly formatted.\n" +

                        "The network scraping provided a new set of challenges, and I had a lot of fun writing " +
                        "a robust, maintainable library for extracting data from the HTML in multithreaded " +
                        "fashion, while providing an on-disk cache for performance when executing in the " +
                        "future. Along the way I got to learn all about WPF databinding, themes, implementing " +
                        "my own controls, and a great deal more.",
                        Technologies = new List<string>
                        {
                            "WPF (C# + XAML)",
                            "LINQ",
                            ".NET 4 parallelism API",
                            "HTTP",
                        },
                        Challenges = new List<string>
                        {
                            "Learning WPF/XAML",
                            "Scraping/parsing Riot's website for up-to-date champion and item data",
                            "Properly leveraging GET requests to get cached data as appropriate",
                            "Locally caching retrieved data for performance",
                            "Synchronizing cached and scraped data in real time without blocking the user",
                            "Best effort at locating the League of Legends data directory without user effort",
                        }
                    }
                },
                {
                    "Sariph", new ProjectDetails
                    {
                        Name = "Sariph.net",
                        DetailsUrl = "/",
                        DetailsText = "This website!",
                        Description = "Sariph.net serves as both my personal homepage and as a tinkering ground " +
                        "for new web technologies. " +
                        "The current incarnation is inspired by Microsoft's modern design language. I was drawn " +
                        "to the bold use of type and \"authentically digital\" user interface.\n" +

                        "I have worked to make the page compatible across browsers, using feature detection " +
                        "where applicable to gracefully fallback. For example, a browser that supports CSS3 " +
                        "3D transforms, transitions, and animations will provide the most fluid experience, " +
                        "whereas a browser that supports only 2D transforms will still be clean and interactive. " +
                        "I strive to deliver this interopability without referring to the browser's user agent " +
                        "string.\n" +

                        "The content itself is built on top of ASP.NET MVC3, and hosted as an Azure Web Site. I went " +
                        "this route due to the flexibility that Razor and Layout Pages provide for providing " +
                        "a consistent look and feel across the site. I explored the ASP.NET Web Pages framework " +
                        "as a lightweight alternative, but went back to MVC for fine-grained control over " +
                        "the server's responses and the potential to scale the scope of the application in " +
                        "the future.",
                        Technologies = new List<string>
                        {
                            "CSS3 transitions, transforms, animations",
                            "HTML5 history API",
                            "ASP.NET MVC3 + Razor"
                        },
                        Challenges = new List<string>
                        {
                            "Cleanly working around bugs in individual browsers",
                            "Writing interopable HTML/script without browser detection"
                        }
                    }
                },
                {
                    "PassKeep", new ProjectDetails
                    {
                        Name = "PassKeep",
                        DetailsUrl = "https://bitbucket.org/sapph/passkeep",
                        DetailsText = "Bitbucket",
                        Description = "Placeholder",
                        Technologies = new List<string>
                        {
                            "C# + XAML",
                            "WinRT",
                        },
                        Challenges = new List<string>
                        {
                            "Understanding the KeePass database format",
                            "Parsing, decrypting, and inflating the database",
                            "Implementing the Salsa20 stream cipher in a KeePass compatible way",
                            "Ramping up on WinRT and its differences from .NET - especially w.r.t files and cryptography",
                            "Designing a clean, intuitive UI",
                            "Integrating customer feedback in a timely and useful fashion"
                        },
                    }
                }
            };

        public static IEnumerable<ProjectTile> GetTiles()
        {
            return new List<ProjectTile>
            {
                new ProjectTile
                {
                    Label = "Citrine",
                    BackgroundColor = "forestgreen"
                },
                new ProjectTile
                {
                    Label = "Wardrobe",
                    HideLabel = true,
                    BackgroundColor = "goldenrod",
                    BackgroundImage = "../Images/Wardrobe.png"
                },
                new ProjectTile
                {
                    Label = "Sariph.net",
                    ProjectId = "Sariph",
                    BackgroundColor = "dimgray"
                },
                new ProjectTile
                {
                    Label = "PassKeep",
                    BackgroundColor = "#3D0087",
                    BackgroundImage = "../Images/PassKeep_logo.png"
                }
                // Blackjack?
            };
        }

        public static ProjectDetails GetProject(string name)
        {
            return Projects[name];
        }
    }
}