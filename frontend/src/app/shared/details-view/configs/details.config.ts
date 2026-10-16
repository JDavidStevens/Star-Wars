export interface ColumnDef<T> {
  key: keyof T & string;
  label: string;
}

interface BaseFilterDef {
  key: string;
  label: string;
}

export interface TextFilterDef extends BaseFilterDef {
  type: 'text';
}

export interface SelectFilterDef extends BaseFilterDef {
  type: 'select';
  options: string[];
}

export type FilterDef = TextFilterDef | SelectFilterDef;

export interface DetailsConfig<T> {
  title: string;
  columns: ColumnDef<T>[];
  filters: FilterDef[];
}
