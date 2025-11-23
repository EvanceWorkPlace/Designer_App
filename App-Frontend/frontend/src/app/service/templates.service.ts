import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TemplatesService {

  private api = 'http://localhost:8000/api/templates/';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.api);
  }
}
