import { CharacterDetails } from '../../../services/characters/characters.model';
import { ListConfig } from './list.config';

export const charactersConfig: ListConfig<CharacterDetails> = {
  title: 'Characters',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'height', label: 'Height' },
    { key: 'mass', label: 'Mass' },
    { key: 'homeworld', label: 'Homeworld' },
  ],
  filters: [{ key: 'search', label: 'Search', type: 'text' }],
};
