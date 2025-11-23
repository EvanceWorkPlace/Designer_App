import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { AuthService } from '../../service/auth';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
export interface TaskEvent {
  timestamp: string | Date;
  actor: string;
  message: string;
  lat?: number;
  lng?: number;
}


@Component({
  selector: 'app-task-detail.component',
  imports: [DatePipe, CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  task: any = null;
  loading = true;
  error = null;
  events: any;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadTask(id);
    // Optionally start polling for updates:
    setInterval(() => {
      if(this.task) this.refresh(this.task.id);
    }, 7000);
  }

  loadTask(id: string) {
    this.loading = true;
    this.taskService.get(id).subscribe({
      next: (t: any) => { this.task = t; this.loading = false; },
      error: err => { this.error = err; this.loading = false; }
    });
  }

  refresh(id: string) {
    this.taskService.get(id).subscribe(t => this.task = t);
  }

  // advance by 1 checkpoint (provider action)
  advance() {
    if (!this.task) return;
    const payload: any = { by: 1, message: 'Advanced via provider dashboard' };


    // if you have the map component and a last location:
    const last = this.task.tracking?.length ? this.task.tracking[this.task.tracking.length - 1] : null;
    if (last && last.lat && last.lng) { payload['lat'] = last.lat; payload['lng'] = last.lng; }

    this.taskService.advance(this.task.id, payload).subscribe((res:any) => {
      this.task = res.task;
    });
  }
  canAdvance(): boolean {
      if (!this.auth?.authHeaders) return false;

      const authHeader = this.auth.authHeaders.get('Authorization');
      const providerToken = this.task?.provider?.token;

      if (!authHeader || !providerToken) return false;

      return !authHeader.includes(providerToken);
  }
  // provider can send periodic location (example)
  sendLocation(lat:number, lng:number) {
    if (!this.task) return;
    this.taskService.addTracking(this.task.id, { lat, lng, message: 'Location update' }).subscribe((res:any) => {
      this.task.tracking = res.task?.tracking || this.task.tracking.concat([res.event]);
    });
  }
  // helper to compute percent done
  percentDone(): number {
    if(!this.task?.checkpoints?.length) return 0;
    const total = this.task.checkpoints.length;
    const done = this.task.checkpoints.filter((c:any)=>c.done).length;
    return Math.round((done / total) * 100);
  }
  reportMyLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported');
    return;
  }
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    this.taskService.addTracking(this.task.id, { lat, lng, message: 'Location update from provider' }).subscribe(res => this.task = res.task || this.task);
  }, (err) => {
    console.error(err);
    alert('Could not get location');
  });
}

}
