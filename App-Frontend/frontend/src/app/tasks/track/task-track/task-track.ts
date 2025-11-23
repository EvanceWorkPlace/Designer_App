import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-task-track',
  standalone: true,
  imports: [],
  templateUrl: './task-track.html',
  styleUrl: './task-track.css',
})
export class TaskTrack {
   taskId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    console.log("Task ID:", this.taskId);
  }

}
