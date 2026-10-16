import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Vehicles {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `api/vehicles`;

  getVehicle(id: number): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getVehicles(search?: string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}`, {
      params: search ? { search } : {},
    });
  }
}
