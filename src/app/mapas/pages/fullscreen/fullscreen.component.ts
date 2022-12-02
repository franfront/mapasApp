import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
      #mapa {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class FullscreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -58.62247439178854, -34.474382479006245],
      zoom: 15
    });
  }
}
