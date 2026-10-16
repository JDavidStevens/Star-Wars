import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Characters {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/characters';

  getCharacter(id: number): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  searchCharacters(search?: string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}`, {
      params: search ? { search } : {},
    });
  }
}
