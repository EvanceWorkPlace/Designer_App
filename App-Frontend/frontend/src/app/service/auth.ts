import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8000/api/accounts'; // change to your backend

  constructor(private http: HttpClient) {}

  login(credentials: { username?:string; email?:string; password:string }) {
    // SimpleJWT expects username & password by default. If you use email, your backend must support it.
    return this.http.post<any>(`${this.api}/login/`, credentials).pipe(
      tap(res => {
        if (res?.access) localStorage.setItem('access_token', res.access);
        if (res?.refresh) localStorage.setItem('refresh_token', res.refresh);
      })
    );
  }

  register(data: any) {
    return this.http.post(`${this.api}/register/`, data);
  }

  logout() {
    const refresh = localStorage.getItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // optional: call backend logout to blacklist refresh
    if (refresh) {
      this.http.post(`${this.api}/logout/`, { refresh }).subscribe({ next: () => {}, error: () => {} });
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
}
