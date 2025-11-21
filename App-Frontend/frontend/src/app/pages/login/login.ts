import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  loading = false;
  error = '';
  success = '';

  form: {
    username: string;
    password: string;
  } = {
    username: '',
    password: ''
  };

  fieldErrors: { [key: string]: string } = {};

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.success = '';
    this.fieldErrors = {};

    if (!this.form.username.trim()) {
      this.fieldErrors['username'] = 'Username or Email is required';
      return;
    }

    if (!this.form.password.trim()) {
      this.fieldErrors['password'] = 'Password is required';
      return;
    }

    this.loading = true;

    this.auth.login(this.form).subscribe({
      next: (_) => {
        this.loading = false;
        this.success = 'Login successful! Redirecting...';

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 700);
      },
      error: (err) => {
        this.loading = false;

        if (err.error) {
          // Django-style errors
          for (const key in err.error) {
            if (Array.isArray(err.error[key])) {
              this.fieldErrors[key] = err.error[key][0];
            } else if (typeof err.error[key] === 'string') {
              this.fieldErrors[key] = err.error[key];
            }
          }
        }

        this.error = 'Invalid username or password';
      }
    });
  }
}
