using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Star_Wars.Services
{
    public class SwapiClient : ISwapiClient
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public SwapiClient(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<string> GetResourceAsync(string resource, int? id = null, string? search = null)
        {
            var client = _httpClientFactory.CreateClient("swapi");

            string url;
            if (id.HasValue)
            {
                url = $"{resource}/{id.Value}/";
            }
            else if (!string.IsNullOrWhiteSpace(search))
            {
                url = $"{resource}/?search={Uri.EscapeDataString(search)}";
            }
            else
            {
                url = $"{resource}/";
            }

            var resp = await client.GetAsync(url);
            if (!resp.IsSuccessStatusCode)
            {
                var content = await resp.Content.ReadAsStringAsync();
                throw new HttpRequestException($"SWAPI request failed with status {(int)resp.StatusCode}: {content}");
            }

            return await resp.Content.ReadAsStringAsync();
        }
    }
}
