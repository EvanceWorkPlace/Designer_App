import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: number;
  status: string;
  address?: string;
  lat?: number;
  lng?: number;
  design?: any; 
}


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html'
})
export class OrdersComponent {
  orders = []; // TODO fetch from backend
}
