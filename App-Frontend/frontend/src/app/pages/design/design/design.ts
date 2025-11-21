import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DesignService } from '../../../service/design';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './design.html'
})
export class DesignComponent {
  selectedColor = '#ff0000';
  uploaded: File | null = null;
  previewUrl: string | null = null;
  title = '';
  notes = '';
  loading = false;
  message = '';

  constructor(private designService: DesignService, private router: Router) {}

  onFile(event: any) {
    const f = event.target.files?.[0];
    if (!f) return;
    this.uploaded = f;
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(f);
  }

  submitDesign() {
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('color_hex', this.selectedColor);
    fd.append('notes', this.notes);
    if (this.uploaded) fd.append('image', this.uploaded, this.uploaded.name);

    this.loading = true;
    this.designService.createDesign(fd).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Design submitted. Go to Orders to place order.';
        // optionally navigate to design list or orders
      },
      error: (e) => {
        this.loading = false;
        this.message = 'Upload failed';
        console.error(e);
      }
    });
  }
}
