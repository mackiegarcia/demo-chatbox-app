import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServerUrl;
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/getAll`);
  }

  loginUser(username, password): Observable<any> {
    const params = { username, password };
    return this.http.post<any>(`${this.baseUrl}/user/login`, params);
  }

  addUser(username, password): Observable<any> {
    const params = { username, password };
    return this.http.post<any>(`${this.baseUrl}/user/add`, params);
  }
}
