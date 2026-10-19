import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { VehicleDetails } from './vehicles.model';

@Service()
export class Vehicles {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `api/vehicles`;

  getVehicle(id: number): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  searchVehicles(search?: string): Observable<VehicleDetails[]> {
    return this.http
      .get<{ results: VehicleDetails[] }>(`${this.baseUrl}`, {
        params: search ? { search } : {},
      })
      .pipe(map((res) => res.results));
  }
}
