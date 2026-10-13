using System.Threading.Tasks;

namespace Star_Wars.Services
{
    public interface ISwapiClient
    {
        /// <summary>
        /// Fetches a resource from SWAPI and returns the raw JSON string.
        /// </summary>
        /// <param name="resource">Resource name (e.g. "people", "starships").</param>
        /// <param name="id">Optional id for a single resource.</param>
        /// <param name="search">Optional search term.</param>
        Task<string> GetResourceAsync(string resource, int? id = null, string? search = null);
    }
}
