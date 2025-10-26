import { Component } from '@angular/core';
import { UsersService, Users, LoginRequest } from '../../services/users.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  user?: Users;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => alert('Credenciais inválidas!')
    });
  }
}
