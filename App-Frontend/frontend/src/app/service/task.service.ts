// src/app/tasks/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:8000/api/tasks'; // adjust base

  constructor(private http: HttpClient, private auth: AuthService) {}

  list(): Observable<any> {
    return this.http.get(this.api, { headers: this.auth.authHeaders });

  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}/`, { headers: this.auth.authHeaders });
  }

  create(payload: any): Observable<any> {
    return this.http.post(this.api + '/', payload, { headers: this.auth.authHeaders });
  }

  advance(id: string, payload: { by?: number; lat?: number; lng?: number; message?: string }): Observable<any> {
    return this.http.post(`${this.api}/${id}/advance/`, payload, { headers: this.auth.authHeaders });
  }

  addTracking(id: string, payload: { lat?: number; lng?: number; message?: string }): Observable<any> {
    return this.http.post(`${this.api}/${id}/add_tracking/`, payload, { headers: this.auth.authHeaders });
  }
}
