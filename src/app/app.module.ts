import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    BrowserModule,
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}