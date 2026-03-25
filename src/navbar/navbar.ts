import { Component, effect, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { NgOptimizedImage } from "@angular/common";
import { AuthService } from '../app/auth/auth-service';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink, NgOptimizedImage, Message],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  router = inject(Router)
  authService = inject(AuthService)
  readonly DARK_MODE_KEY = 'dark-mode'
  isDark = signal(localStorage.getItem(this.DARK_MODE_KEY) === 'true')

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDark())
      localStorage.setItem(this.DARK_MODE_KEY, String(this.isDark()))
    })
  }

  toggleDarkMode() {
    this.isDark.update(value => !value);
    document.documentElement.classList.toggle('app-dark', this.isDark());
  }

  logout() {
    this.authService.logout().subscribe(() => {
      void this.router.navigate(['/'])
    })
  }
}
