import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  loading = false;

  // FIX 1: Add "error"
  error: string = '';

  // FIX 2: Add form model
  form = {
    email: '',
    password: ''
  };

  constructor() {}

  // FIX 3: Add submit() function
  async submit() {
    this.error = '';
    this.loading = true;

    try {
      // TEMP: Simulation
      if (this.form.email === '' || this.form.password === '') {
        throw new Error('Email and password are required');
      }

      // TODO: Call your API here
      console.log('Logging in with:', this.form);

      this.loading = false;
    } catch (err: any) {
      this.error = err.message || 'Login failed';
      this.loading = false;
    }
  }
}
