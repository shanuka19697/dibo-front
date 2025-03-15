import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'isAuthenticated';

  constructor(private router: Router) {}

  // Mock login method
  login(username: string, password: string): boolean {
    if (username === 'user' && password === '123456') {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      this.router.navigate(['/admin']);
      return true;
    }
    return false;
  }

  // Mock logout method
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}