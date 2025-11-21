import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html'
})
export class MapComponent implements AfterViewInit {
  map!: L.Map;
  marker!: L.Marker;

  ngAfterViewInit() {
    this.map = L.map('mapid').setView([ -26.2041, 28.0473 ], 10); // Johannesburg default
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OSM contributors'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      if (this.marker) this.marker.setLatLng([lat, lng]);
      else this.marker = L.marker([lat, lng]).addTo(this.map);
      // you can save lat/lng and reverse-geocode if desired
      console.log('picked', lat, lng);
    });
  }
}
