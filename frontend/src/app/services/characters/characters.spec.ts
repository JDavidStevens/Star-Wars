import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Characters } from './characters';
import { CharacterDetails } from './characters.model';

describe('Characters', () => {
  let service: Characters;
  let httpMock: HttpTestingController;

  const character: CharacterDetails = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    homeworld: 'https://swapi.dev/api/planets/1/',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Characters);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchCharacters should GET /api/characters and unwrap results', () => {
    let result: CharacterDetails[] | undefined;
    service.searchCharacters().subscribe((r) => (result = r));

    const req = httpMock.expectOne((r) => r.url === '/api/characters');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.has('search')).toBe(false);

    req.flush({ count: 1, next: null, previous: null, results: [character] });

    expect(result).toEqual([character]);
  });

  it('searchCharacters should send the search param when provided', () => {
    service.searchCharacters('luke').subscribe();

    const req = httpMock.expectOne((r) => r.url === '/api/characters');
    expect(req.request.params.get('search')).toBe('luke');

    req.flush({ results: [] });
  });

  it('getCharacter should GET /api/characters/:id and unwrap results', () => {
    let result: CharacterDetails | undefined;
    service.getCharacter(1).subscribe((r) => (result = r));

    const req = httpMock.expectOne('/api/characters/1');
    expect(req.request.method).toBe('GET');

    req.flush({ results: character });

    expect(result).toEqual(character);
  });
});
