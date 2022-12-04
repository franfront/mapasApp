import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-cotainer {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 90;
      }

      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapaZoom') mapaZoom!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  latLong: [number, number] = [-58.62247439178854, -34.474382479006245];

  markers: MarkerColor[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.mapaZoom.nativeElement, // El elemento en si
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.latLong,
      zoom: this.zoomLevel,
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';
    this.leerLocalStorage();
  }

  agregarMarcador() {
    const colorMarker = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    ); // Genera un color aleatorio

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: colorMarker,
    })
      .setLngLat(this.latLong)
      .addTo(this.mapa);

    this.markers.push({
      color: colorMarker,
      marker: newMarker,
    });
    this.guardarMarcadores();

    newMarker.on('dragend', () => {
      this.guardarMarcadores();
    });
  }

  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker.getLngLat(),
      zoom: 17,
    });
  }

  guardarMarcadores() {
    const lngLatArr: MarkerColor[] = [];

    this.markers.forEach((m) => {
      const colorDos = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: colorDos,
        centro: [lng, lat],
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );

    lngLatArr.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.markers.push({
        marker: newMarker,
        color: m.color,
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadores();
      });

    });
  }

  borrarMarker(i: number){
    this.markers[i].marker?.remove(); // borrar del mapa
    this.markers.splice(i, 1); //borrar del arreglo
    this.guardarMarcadores(); // guardar en el localstorage
  }


}
