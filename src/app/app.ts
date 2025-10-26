import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  constructor(public authService: AuthService) {} 
  // <- deixa como public pra usar direto no template

  title = signal('nicole-portfolio-frontend');
  currentYear = new Date().getFullYear();

  logout(): void {
    this.authService.logout();
  }
}
