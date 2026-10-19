import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Starships } from './starships';
import { StarshipDetails } from './starships.model';

describe('Starships', () => {
  let service: Starships;
  let httpMock: HttpTestingController;

  const starship: StarshipDetails = {
    name: 'Millennium Falcon',
    hyperdrive_rating: '0.5',
    length: '34.37',
    crew: '4',
    passengers: '6',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Starships);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchStarships should GET api/starships and unwrap results', () => {
    let result: StarshipDetails[] | undefined;
    service.searchStarships().subscribe((r) => (result = r));

    const req = httpMock.expectOne((r) => r.url === 'api/starships');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.has('search')).toBe(false);

    req.flush({ count: 1, next: null, previous: null, results: [starship] });

    expect(result).toEqual([starship]);
  });

  it('searchStarships should send the search param when provided', () => {
    service.searchStarships('falcon').subscribe();

    const req = httpMock.expectOne((r) => r.url === 'api/starships');
    expect(req.request.params.get('search')).toBe('falcon');

    req.flush({ results: [] });
  });

  it('getStarship should GET api/starships/:id and unwrap results', () => {
    let result: StarshipDetails | undefined;
    service.getStarship(10).subscribe((r) => (result = r));

    const req = httpMock.expectOne('api/starships/10');
    expect(req.request.method).toBe('GET');

    req.flush({ results: starship });

    expect(result).toEqual(starship);
  });
});
