import { Component } from '@angular/core';
import { TableModule } from '@healthcatalyst/cashmere';

@Component({
  imports: [TableModule],
  selector: 'app-list-view',
  styleUrl: './list-view.scss',
  templateUrl: './list-view.html',
})
export class ListView {}
