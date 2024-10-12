// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7209/api/Auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/login`, { username, password })
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          this.isLoggedInSubject.next(true);
          return true;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
  public isLoggedIn(): boolean {

    if(typeof window !== 'undefined' && localStorage){
      const isLoggedIn = localStorage.getItem('access_token');
      console.log(isLoggedIn);
      return !!isLoggedIn;
    }else{
      return false;
    }
    
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }
}


