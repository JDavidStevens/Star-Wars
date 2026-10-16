import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Starships {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'api/starships';

  getStarship(id: number): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  searchStarships(search?: string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}`, {
      params: search ? { search } : {},
    });
  }
}
