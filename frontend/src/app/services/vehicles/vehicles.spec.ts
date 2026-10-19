import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Vehicles } from './vehicles';
import { VehicleDetails } from './vehicles.model';

describe('Vehicles', () => {
  let service: Vehicles;
  let httpMock: HttpTestingController;

  const vehicle: VehicleDetails = {
    name: 'Sand Crawler',
    model: 'Digger Crawler',
    length: '36.8',
    max_atmospheric_speed: '30',
    passengers: '30',
    crew: '46',
    vehicle_class: 'wheeled',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Vehicles);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchVehicles should GET api/vehicles and unwrap results', () => {
    let result: VehicleDetails[] | undefined;
    service.searchVehicles().subscribe((r) => (result = r));

    const req = httpMock.expectOne((r) => r.url === 'api/vehicles');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.has('search')).toBe(false);

    req.flush({ count: 1, next: null, previous: null, results: [vehicle] });

    expect(result).toEqual([vehicle]);
  });

  it('searchVehicles should send the search param when provided', () => {
    service.searchVehicles('crawler').subscribe();

    const req = httpMock.expectOne((r) => r.url === 'api/vehicles');
    expect(req.request.params.get('search')).toBe('crawler');

    req.flush({ results: [] });
  });

  it('getVehicle should GET api/vehicles/:id', () => {
    service.getVehicle(4).subscribe();

    const req = httpMock.expectOne('api/vehicles/4');
    expect(req.request.method).toBe('GET');

    req.flush(vehicle);
  });
});
