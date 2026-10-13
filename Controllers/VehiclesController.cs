using Microsoft.AspNetCore.Mvc;

namespace Star_Wars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly Star_Wars.Services.ISwapiClient _swapiClient;

        public VehiclesController(Star_Wars.Services.ISwapiClient swapiClient)
        {
            _swapiClient = swapiClient;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            try
            {
                var json = await _swapiClient.GetResourceAsync("vehicles", id);
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
                var json = await _swapiClient.GetResourceAsync("vehicles", null, search);
                return Content(json, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, ex.Message);
            }
        }
    }
}
