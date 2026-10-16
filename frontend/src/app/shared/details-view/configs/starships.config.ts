import { StarshipRow } from '../../../services/starships/starships.model';
import { DetailsConfig } from './details.config';

export const starshipsConfig: DetailsConfig<StarshipRow> = {
  title: 'Starships',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'hyperdriveRating', label: 'Hyperdrive Rating' },
    { key: 'length', label: 'Length' },
    { key: 'crew', label: 'Crew' },
    { key: 'passengers', label: 'Passengers' },
    { key: 'films', label: 'Films' },
    { key: 'pilots', label: 'Pilots' },
  ],
  filters: [{ key: 'search', label: 'Search', type: 'text' }],
};
