import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app.routes';

// Components
import { RoleSelect } from './role-select/role-select';
import { CustomerDashboardComponent } from './pages/customer-dashboard.component/customer-dashboard.component';
import { ProviderDashboardComponent } from './pages/provider-dashboard.component/provider-dashboard.component';

// Tasks
import { TaskCreate } from './tasks/create/task-create/task-create';
import { TaskTrack } from './tasks/track/task-track/task-track';

// Blog
import { BlogList } from './blog/blog-list/blog-list';
import { BlogPost } from './blog/blog-post/blog-post';

// Customer
import { CreateService } from './customer/create-service/create-service';

// Choose your root component
import { App } from '../app/app';   // Make sure this exists!


@NgModule({
  declarations: [
    // Pages & dashboards
   

  

   
  ],

  imports: [
      // Tasks
     // Blog
    BlogList,
    BlogPost,

    // Other
    RoleSelect,
    CreateService,
    CustomerDashboardComponent,
    ProviderDashboardComponent,
    TaskCreate,
    TaskTrack,
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
  ],

  providers: [],

  // The main component Angular starts with
  bootstrap: [App]
})
export class AppModule { }
