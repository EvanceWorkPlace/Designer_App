import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:8000/api/accounts';
  token$ = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  constructor(private http: HttpClient) {}

  login(credentials: { username?: string; email?: string; password: string }) {
    return this.http.post<any>(`${this.api}/login/`, credentials).pipe(
      tap(res => {
        if (res?.access) localStorage.setItem('access_token', res.access);
        if (res?.refresh) localStorage.setItem('refresh_token', res.refresh);
      })
    );
  }

  register(payload: any) {
    // return this.http.post(`${this.api}/register/`, data);
      
      return this.http.post(`${this.api}/auth/register/`, payload);
  }

  logout() {
    const refresh = localStorage.getItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    localStorage.removeItem('token');
    
  
    if (refresh) {
      this.http.post(`${this.api}/logout/`, { refresh }).subscribe();
    }
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.api}/profile/`);
  }

  updateProfile(payload: any) {
    return this.http.put(`${this.api}/profile/`, payload);
  }

  changePassword(payload: { old_password: string; new_password: string }) {
    return this.http.post(`${this.api}/change-password/`, payload);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
  getMe() {
  return this.http.get(`${this.api}/me/`);
  }

 
  get authHeaders() {
  const token = localStorage.getItem('access');

  return token
    ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    : new HttpHeaders(); // empty but valid
}


//#######


// src/app/auth/auth.service.ts


}




//######


