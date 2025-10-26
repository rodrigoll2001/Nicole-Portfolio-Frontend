// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://nicole-portfolio-backend.onrender.com/auth'; // backend endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          // salva o token no localStorage
          localStorage.setItem('token', response.token);
          console.log('logado', response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }
}
