import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [loginGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    pathMatch: 'full',
    canActivate: [loginGuard],
  },
  {
    path: 'listing',
    loadChildren: () =>
      import('./pages/CRUD/crud-routing').then((m) => m.CRUD_ROUTE),
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
