import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-customer-dashboard.component',
  standalone: true,
  imports: [],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css',
})
export class CustomerDashboardComponent implements OnInit {
  tasks: any[] = [];
  loading = false;

  constructor(private taskService: TaskService, public auth: AuthService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.taskService.list().subscribe((res:any) => {
      // filter only customer tasks
      this.tasks = res.filter((t:any) => t.customer && t.customer.username === this.auth.token$); // adapt
      this.loading = false;
    }, () => this.loading = false);
  }

  open(task:any) {
    // navigate to details
  }
}
