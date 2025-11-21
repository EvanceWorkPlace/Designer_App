import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  form = { username: '', email: '', password: '', password2: '' };
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    if (this.form.password !== this.form.password2) { this.error = 'Passwords do not match'; return; }
    this.loading = true;
    this.auth.register(this.form).subscribe({
      next: () => {
        this.loading = false;
        alert('Account created. Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = JSON.stringify(err.error);
      }
    });
  }
}
