import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ProfileComponent } from './pages/profile/profile';
import { ChangePasswordComponent } from './pages/password/change-password/change-password';
import { DesignComponent } from './pages/design/design/design';
import { OrdersComponent } from './pages/orders/orders/orders';
import { MapComponent } from './pages/map/map/map';
import { AuthGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home/', component: HomeComponent },
  { path: 'design/', component: DesignComponent, canActivate: [AuthGuard] },
  { path: 'orders/', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'map/', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'profile/', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'password/', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'login/', component: LoginComponent },
  { path: 'register/', component: RegisterComponent }, 
];
