import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StarshipDetails } from './starships.model';

@Service()
export class Starships {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'api/starships';

  getStarship(id: number): Observable<StarshipDetails> {
    return this.http
      .get<{ results: StarshipDetails }>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.results));
  }

  searchStarships(search?: string): Observable<StarshipDetails[]> {
    return this.http
      .get<{ results: StarshipDetails[] }>(`${this.baseUrl}`, {
        params: search ? { search } : {},
      })
      .pipe(map((res) => res.results));
  }
}
