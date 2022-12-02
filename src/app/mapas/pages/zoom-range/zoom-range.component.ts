import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-cotainer {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        z-index: 999;
        width: 400px;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapaZoom') mapaZoom!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  latLong: [number, number] = [-58.62247439178854, -34.474382479006245];

  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {}); //off destruye el evento de escucha
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    //luego de que se inizialica la vista
    this.mapa = new mapboxgl.Map({
      container: this.mapaZoom.nativeElement, // El elemento en si
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.latLong,
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', (e) => {
      // on escucha eventos
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    });

    this.mapa.on('zoomend', (e) => {
      // on escucha eventos
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
      if (this.mapa.getZoom() < 2) {
        this.mapa.zoomTo(2);
      }
    });

    this.mapa.on('move', (e) => {// move es cuando se mueve el mapa
        const target = e.target;
        const {lng, lat} = target.getCenter();
        this.latLong = [lng, lat];

    });
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }
}
