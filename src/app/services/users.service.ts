import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Users {
  id: number;
  name: string;
  username: string;
  passwordHash: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://nicole-portfolio-backend.onrender.com/users/login';

  constructor(private http: HttpClient) {}

  validateLogin(request: LoginRequest): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, request);
  }
}
