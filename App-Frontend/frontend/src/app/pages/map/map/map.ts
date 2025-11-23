import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @Input() tracking: any[] = []; // [{lat, lng, timestamp, message}, ...]
  map!: L.Map;
  marker!: L.Marker;

  ngAfterViewInit(){
    this.map = L.map(this.mapContainer.nativeElement).setView([-26.2041, 28.0473], 6); // center SA
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    if(this.tracking && this.tracking.length){
      const last = this.tracking[this.tracking.length-1];
      this.marker = L.marker([last.lat, last.lng]).addTo(this.map);
      this.map.setView([last.lat, last.lng], 12);
    }
  }

  animateTo(lat: number, lng: number){
    if(!this.marker){
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.map.setView([lat, lng], 12);
      return;
    }
    // simple linear animation
    const start = this.marker.getLatLng();
    const frames = 20;
    let i = 0;
    const stepLat = (lat - start.lat) / frames;
    const stepLng = (lng - start.lng) / frames;
    const iv = setInterval(()=> {
      if(i>=frames){ clearInterval(iv); return; }
      const newLat = start.lat + stepLat*(i+1);
      const newLng = start.lng + stepLng*(i+1);
      this.marker.setLatLng([newLat, newLng]);
      i++;
    }, 50);
  }
}
// 
// map.component.ts


