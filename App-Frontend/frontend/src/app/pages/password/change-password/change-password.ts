
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // <-- ADD THIS
import { FormsModule } from '@angular/forms';     // <-- Needed for ngModel
import { AuthService } from '../../../service/auth';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- ADD THIS LINE
  templateUrl: './change-password.html',
})
export class ChangePasswordComponent {
  message: string = '';
  form = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };
  loading: boolean = false;
  constructor(private auth: AuthService) {}

  submit() {
    this.message = '';
    if (this.form.new_password !== this.form.confirm_password) { this.message = 'Passwords do not match'; return; }
    this.loading = true;
    this.auth.changePassword({ old_password: this.form.old_password, new_password: this.form.new_password }).subscribe({
      next: () => { this.loading = false; this.message = 'Password updated' },
      error: () => { this.loading = false; this.message = 'Password update failed' }
    });
  }

}
