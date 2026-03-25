import { Component, inject, signal } from '@angular/core'
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

  isDark = signal(false);

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
