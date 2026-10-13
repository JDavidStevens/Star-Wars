using Microsoft.AspNetCore.Mvc;

namespace Star_Wars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SwapiController : ControllerBase
    {
        private readonly Star_Wars.Services.ISwapiClient _swapiClient;

        public SwapiController(Star_Wars.Services.ISwapiClient swapiClient)
        {
            _swapiClient = swapiClient;
        }

        [HttpGet("people/{id:int}")]
        public async Task<IActionResult> GetPerson(int id)
        {
            try
            {
                var json = await _swapiClient.GetResourceAsync("people", id);
                return Content(json, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, ex.Message);
            }
        }

        [HttpGet("people")]
        public async Task<IActionResult> SearchPeople([FromQuery] string? search)
        {
            try
            {
                var json = await _swapiClient.GetResourceAsync("people", null, search);
                return Content(json, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, ex.Message);
            }
        }
    }
}
