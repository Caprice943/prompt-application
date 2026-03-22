import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  isDark = signal(false);

  toggleDarkMode() {
    this.isDark.update(value => !value);
    document.documentElement.classList.toggle('app-dark', this.isDark());
  }
}
