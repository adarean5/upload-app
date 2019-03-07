import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'upload',
    loadChildren: './upload/upload.module#UploadModule'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
