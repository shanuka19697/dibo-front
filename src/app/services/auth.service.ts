import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'isAuthenticated';
  private readonly ROLE_KEY = 'userRole';

  constructor(private router: Router) {}

  // Mock login method with multiple accounts
  login(username: string, password: string): boolean {
    if (username === 'teacher' && password === 'teacher123') {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      localStorage.setItem(this.ROLE_KEY, 'teacher');
      this.router.navigate(['/admin']);
      return true;
    } else if (username === 'principal' && password === 'principal123') {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      localStorage.setItem(this.ROLE_KEY, 'principal');
      this.router.navigate(['/admin']);
      return true;
    }

    // Invalid credentials
    return false;
  }

  // Mock logout method
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === 'true';
  }

  // Get current user role
  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
}
