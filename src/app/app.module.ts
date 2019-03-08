import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';
import { ROUTES } from './app.routes';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appReducers } from './app.reducers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([]),
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
