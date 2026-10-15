import { TestBed } from '@angular/core/testing';
import { Starships } from './starships';

describe('Starships', () => {
  let service: Starships;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Starships);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
