import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './auth.routes';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), MaterialModule]
})
export class AuthModule {}
