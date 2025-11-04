import { Component } from '@angular/core';
import { AccountsService } from '../../../services/Account/accounts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports:[CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[AccountsService]
})
export class LoginComponent {
  username = '';
  password = '';
  userData: any = null;

  constructor(private authService: AccountsService, private Router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          const token = response.access_token;
          localStorage.setItem('token', token);
          this.authService.getUser(token).subscribe({
            next: (user) => {
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(user));
              alert(`Welcome, ${user.firstname} ${user.lastname}!`);
              console.log('Logged-in user data:', user);
              this.Router.navigate(['/home']);
            },
            error: () => {
              alert('Unable to fetch user information');
            }
          });
        },
        error: (err) => {
          console.error(err);
          alert('Invalid username or password');
        }
      });
  }
}
