import { StarshipDetails } from '../../../services/starships/starships.model';
import { ListConfig } from './list.config';

export const starshipsConfig: ListConfig<StarshipDetails> = {
  title: 'Starships',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'hyperdrive_rating', label: 'Hyperdrive Rating' },
    { key: 'length', label: 'Length' },
    { key: 'crew', label: 'Crew' },
    { key: 'passengers', label: 'Passengers' },
  ],
  filters: [{ key: 'search', label: 'Search', type: 'text' }],
};
