import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  user: any = null;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.getMe().subscribe({
        next: (u) => this.user = u,
        error: (_) => this.user = null
      });
    }
  }
}
