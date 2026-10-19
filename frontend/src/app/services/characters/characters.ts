import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CharacterDetails } from './characters.model';

@Service()
export class Characters {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/characters';

  getCharacter(id: number): Observable<CharacterDetails> {
    return this.http
      .get<{ results: CharacterDetails }>(`${this.baseUrl}/${id}`)
      .pipe(map((r) => r.results));
  }

  searchCharacters(search?: string): Observable<CharacterDetails[]> {
    return this.http
      .get<{ results: CharacterDetails[] }>(`${this.baseUrl}`, {
        params: search ? { search } : {},
      })
      .pipe(map((r) => r.results));
  }
}
