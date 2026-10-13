using Microsoft.AspNetCore.Mvc;

namespace Star_Wars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StarshipsController : ControllerBase
    {
        private readonly Star_Wars.Services.ISwapiClient _swapiClient;

        public StarshipsController(Star_Wars.Services.ISwapiClient swapiClient)
        {
            _swapiClient = swapiClient;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStarship(int id)
        {
            try
            {
                var json = await _swapiClient.GetResourceAsync("starships", id);
                return Content(json, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string? search)
        {
            try
            {
                var json = await _swapiClient.GetResourceAsync("starships", null, search);
                return Content(json, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, ex.Message);
            }
        }
    }
}
