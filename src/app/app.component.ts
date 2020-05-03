import { Component, ViewChild } from '@angular/core';
import { museums } from './museums5';
import { MapMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  styles: [
    `
      agm-map {
        height: 100vh;
      }
    `
  ],
  template: `

  <google-map height="400px"
              width="750px"
              [center]="center"
              [zoom]="zoom">
    <map-marker #marker
                *ngFor="let museum of museums"
                [position]="museum.coordinates"
                [options]="markerOptions" (mapClick)="openInfoWindow(marker, museum)"></map-marker>
    <map-info-window>{{infoContent}}</map-info-window>
  </google-map>
  `
})
export class AppComponent {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  center;
  zoom: number = 8;
  markerOptions = {draggable: false};
  museums = [];
  cityMuseums = {};
  cities = new Set();
  infoContent = ''

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          if (position) {
            console.log(position);
            this.center = {lat: position.coords.latitude, lng: position.coords.longitude};
          }
        },
        (error: PositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    setTimeout(_ => {
      console.log(JSON.stringify(Array.from(this.cities)));
      console.log(museums.length);
      this.museums = museums;
    }, 3000);
  }

  openInfoWindow(marker: MapMarker, museum) {
    this.infoContent = museum.name
    this.infoWindow.open(marker);
  }

}
