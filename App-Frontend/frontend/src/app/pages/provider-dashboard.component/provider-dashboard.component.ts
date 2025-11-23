import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { AuthService } from '../../service/auth';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-provider-dashboard.component',
  imports: [RouterLink,NgFor, TitleCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './provider-dashboard.component.html',
  styleUrl: './provider-dashboard.component.css',
})

export class ProviderDashboardComponent implements OnInit {
  tasks: any[] = [];
  loading = false;

  constructor(private taskService: TaskService, public auth: AuthService) {}

  ngOnInit() {
    this.load();
    // optional polling for live updates
    setInterval(()=> this.load(), 10000);
  }

  load() {
    this.loading = true;
    this.taskService.list().subscribe((res:any) => {
      // filter only provider tasks
      this.tasks = res.filter((t:any) => t.provider && t.provider.username === this.auth.token$); // adapt per your user object
      this.loading = false;
    }, () => this.loading = false);
  }

  accept(task:any) {
    // Example: advance from pending to accepted by calling advance with message
    this.taskService.advance(task.id, { by:1, message: 'Provider accepted' }).subscribe((res:any) => {
      this.load();
    });
  }
}
