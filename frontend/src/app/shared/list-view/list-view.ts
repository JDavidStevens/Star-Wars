import { Component, input } from '@angular/core';
import { ListConfig } from './configs/list.config';

@Component({
  imports: [],
  selector: 'app-list-view',
  styleUrl: './list-view.scss',
  templateUrl: './list-view.html',
})
export class ListView<T = any> {
  rows = input<T[]>([]);
  config = input.required<ListConfig<T>>();
}
