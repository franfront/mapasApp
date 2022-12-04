import { Component, OnInit } from '@angular/core';

interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styles: [],
})
export class PropiedadesComponent {
  propiedades: Propiedad[] = [
    {
      titulo: 'Ciudad abandonada de Prípiat, Ucrania',
      descripcion:
        'Prípiat es una ciudad fantasma en la zona de exclusión de Chernóbil al norte de Ucrania en la región de Kiev',
      lngLat: [30.056743348263137, 51.40468466637091],
    },
    {
      titulo: 'Lago Hillier, Australia',
      descripcion: 'Emblemático lago de color rosa, rodeado de arena y bosques, que obtiene su color debido a un organismo único.',
      lngLat: [ 123.20316616156862,  -34.09469458519607],
    },
    {
      titulo: 'Lisakovsk Pentagram, Kazajistán',
      descripcion:
        'Vasta y misteriosa estrella de 5 puntas en un círculo, que se dice son los restos de un parque soviético',
      lngLat: [ 62.1856809237063, 52.47986236986699],
    },
    {
      titulo: 'Airplane Boneyard, Estados Unidos',
      descripcion:
        'Campo de aeronaves militares de la Segunda Guerra Mundial en adelante',
      lngLat: [ -110.8521545008313, 32.172823026927574],
    },
  ];

  constructor() {}
}
