import { Component } from '@angular/core';
import { museums } from './museums5';

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
    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
      <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
      <agm-marker-cluster
        [imagePath]="'https://googlemaps.github.io/js-marker-clusterer/images/m'">
        <agm-marker
          *ngFor="let museum of museums"
          [latitude]="museum.coordinates[0]"
          [longitude]="museum.coordinates[1]"
        ><agm-info-window>{{ museum.name }}</agm-info-window></agm-marker>
      </agm-marker-cluster>        
    </agm-map>
  `
})
export class AppComponent {
  lat: number;
  lng: number;
  zoom: number = 16;
  museums = [];
  cityMuseums = {};
  cities = new Set();

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          if (position) {
            console.log(position);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          }
        },
        (error: PositionError) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    // museums.forEach(museum => {
    //   this.cityMuseums[museum.city] = this.cityMuseums[museum.city] || [];
    //   this.cityMuseums[museum.city].push(museum);
    //   this.cities.add(museum.city);
    // });

    setTimeout(_ => {
      console.log(JSON.stringify(Array.from(this.cities)));
      console.log(museums.length);
      this.museums = museums;
    }, 3000);
  }
}
