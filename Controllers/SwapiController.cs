using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Star_Wars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SwapiController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public SwapiController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("people/{id:int}")]
        public async Task<IActionResult> GetPerson(int id)
        {
            var client = _httpClientFactory.CreateClient("swapi");
            var resp = await client.GetAsync($"people/{id}/");
            if (!resp.IsSuccessStatusCode)
            {
                return StatusCode((int)resp.StatusCode, "Error fetching data from SWAPI.");
            }
            var json = await resp.Content.ReadAsStringAsync();
            return Content(json, "application/json");
        }

        [HttpGet("people")]
        public async Task<IActionResult> SearchPeople([FromQuery] string? search)
        {
            var client = _httpClientFactory.CreateClient("swapi");
            var url = string.IsNullOrWhiteSpace(search) ? "people/" : $"people/?search={Uri.EscapeDataString(search)}";
            var resp = await client.GetAsync(url);
            if (!resp.IsSuccessStatusCode)
            {
                return StatusCode((int)resp.StatusCode, "Error fetching data from SWAPI.");
            }
            var json = await resp.Content.ReadAsStringAsync();
            return Content(json, "application/json");
        }
    }
}
