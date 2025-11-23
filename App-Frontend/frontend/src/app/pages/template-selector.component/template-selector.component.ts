import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../service/templates.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-template-selector.component',
  imports: [CommonModule],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.css',
})
export class TemplateSelectorComponent implements OnInit{
      
  role: 'provider' | 'customer' | null = null;
  templates: any[] = [];

  constructor(
    private ts: TemplatesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  selectRole(role: 'provider' | 'customer') {
    this.role = role;
  }

  loadTemplates() {
      this.ts['list']().subscribe((res: any) => {
      this.templates = res;
    });
  }

  useTemplate(t: any) {
    if (!this.role) return;

    // Navigate to correct creation page depending on role
    if (this.role === 'customer') {
      this.router.navigate(['/customer/create-service'], { state: { template: t } });
    }

    if (this.role === 'provider') {
      this.router.navigate(['/provider'], { state: { template: t } });
    }
  }}


// template-selector.component.ts


