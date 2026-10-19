import { VehicleDetails } from '../../../services/vehicles/vehicles.model';
import { ListConfig } from './list.config';

export const vehiclesConfig: ListConfig<VehicleDetails> = {
  title: 'Vehicles',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'model', label: 'Model' },
    { key: 'vehicle_class', label: 'Vehicle Class' },
    { key: 'length', label: 'Length' },
    { key: 'max_atmospheric_speed', label: 'Max Atmospheric Speed' },
    { key: 'crew', label: 'Crew' },
    { key: 'passengers', label: 'Passengers' },
  ],
  filters: [{ key: 'search', label: 'Search', type: 'text' }],
};
