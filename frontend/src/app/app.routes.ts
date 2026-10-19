import { Routes } from '@angular/router';
import { Starships } from './services/starships/starships';
import { inject } from '@angular/core';
import { starshipsConfig } from './shared/list-view/configs/starships.config';
import { Vehicles } from './services/vehicles/vehicles';
import { Characters } from './services/characters/characters';
import { ListView } from './shared/list-view/list-view';
import { charactersConfig } from './shared/list-view/configs/characters.config';
import { vehiclesConfig } from './shared/list-view/configs/vehicles.config';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    component: ListView,
    resolve: { rows: () => inject(Characters).searchCharacters() },
    data: { config: charactersConfig },
  },
  {
    path: 'starships',
    component: ListView,
    resolve: { rows: () => inject(Starships).searchStarships() },
    data: { config: starshipsConfig },
  },
  {
    path: 'vehicles',
    component: ListView,
    resolve: { rows: () => inject(Vehicles).searchVehicles() },
    data: { config: vehiclesConfig },
  },
];
