import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ProfileComponent } from './pages/profile/profile';
import { ChangePasswordComponent } from './pages/password/change-password/change-password';
import { DesignComponent } from './pages/design/design/design';
import { OrdersComponent } from './pages/orders/orders/orders';
import { Templates } from './customer/templates/templates';
import { MapComponent } from './pages/map/map/map';
import { AuthGuard } from './guard/auth-guard';
import { NgModule } from '@angular/core';


// Role Selection
import { RoleSelect } from './role-select/role-select';

// Customer Templates

// Service Provider Templates

// Dashboards
import { CustomerDashboardComponent } from './pages/customer-dashboard.component/customer-dashboard.component';
import { ProviderDashboardComponent } from './pages/provider-dashboard.component/provider-dashboard.component';


// Tasks
import { TaskCreate } from './tasks/create/task-create/task-create';
import { TaskTrack } from './tasks/track/task-track/task-track';
import { TaskDetailComponent } from './pages/task-detail.component/task-detail.component';
// Blog
import { BlogList } from './blog/blog-list/blog-list';
import { BlogPost } from './blog/blog-post/blog-post';
import { CreateService } from './customer/create-service/create-service';

// 404 Page
// import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'design', component: DesignComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'choose-role', component: RoleSelect},
  // HOME → choose customer or provider
  { path: '', component: RoleSelect },
  { path: 'task-details', component:  TaskDetailComponent },

  // CUSTOMER
  {
    path: 'customer',
    children: [
      { path: '', component: CustomerDashboardComponent},
      { path: 'create-service', component: CreateService },
    ]
  },

  // PROVIDER
  {
    path: 'provider',
    children: [
      {path:'template', component:Templates},
      { path: '', component: ProviderDashboardComponent },
    ]
  },

  // TASKS
  {
    path: 'tasks',
    children: [
      { path: 'create', component: TaskCreate },
      { path: 'track/:id', component: TaskTrack },
      
    ]
  },

  // BLOG
  {
    path: 'blog',
    children: [
      { path: '', component: BlogList },
      { path: ':id', component: BlogPost },
    ]
  },

  // 404 fallback
  //{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}