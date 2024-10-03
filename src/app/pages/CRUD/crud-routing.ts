import { Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { ReadComponent } from './read/read.component';
import { CreateUpdateComponent } from './create-update/create-update.component';

export const CRUD_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./read/read.component').then((m) => ReadComponent),
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: CreateUpdateComponent,
    canActivate: [authGuard],
    pathMatch: 'full',
  },
  {
    path: 'update/:id',
    component: CreateUpdateComponent,
    canActivate: [authGuard],
    pathMatch: 'full',
  },
];
