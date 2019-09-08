import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.baseUrl = environment.apiServerUrl;
  }

  addMessage(userId, message): Observable<any> {
    const params = { userId, message };
    return this.http.post<any>(`${this.baseUrl}/message/add`, params);
  }

  getAllMessages(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/message/getAll`);
  }

}
