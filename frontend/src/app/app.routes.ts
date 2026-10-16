import { Routes } from '@angular/router';
import { DetailsView } from './shared/details-view/details-view';
import { Starships } from './services/starships/starships';
import { inject } from '@angular/core';
import { starshipsConfig } from './shared/details-view/configs/starships.config';

export const routes: Routes = [
  {
    path: 'starships',
    component: DetailsView,
    resolve: { rows: () => inject(Starships).searchStarships() },
    data: { config: starshipsConfig },
  },
];
