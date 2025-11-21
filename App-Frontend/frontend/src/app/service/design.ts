import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DesignService {
  private api = 'http://localhost:8000/api/accounts';

  constructor(private http: HttpClient) {}

  listDesigns() {
    return this.http.get(`${this.api}/designs/`);
  }

  createDesign(formData: FormData) {
    return this.http.post(`${this.api}/designs/`, formData);
  }

  deleteDesign(id: number) {
    return this.http.delete(`${this.api}/designs/${id}/`);
  }

  listOrders() {
    return this.http.get(`${this.api}/orders/`);
  }

  createOrder(payload: any) {
    return this.http.post(`${this.api}/orders/`, payload);
  }
}
