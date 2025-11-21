import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
  form: any = { username: '', email: '', first_name: '', last_name: '' };
  message = '';
  loading = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: (data) => { this.form = data; },
      error: () => {}
    });
  }

  save() {
    this.loading = true;
    this.auth.updateProfile(this.form).subscribe({
      next: () => { this.loading = false; this.message = 'Profile saved'; },
      error: () => { this.loading = false; this.message = 'Save failed'; }
    });
  }
}
