import { Component, OnInit } from '@angular/core';

export interface Product {
  name?: string;
  price?: number;
  inventoryStatus?: string;
  image?: string;
}

const ELEMENT_DATA: Product[] = [
  { name: 'Producto 1', price: 100, inventoryStatus: 'InStock', image: 'p1.jpg' },
  { name: 'Producto 2', price: 200, inventoryStatus: 'InStock', image: 'p2.jpg' },
  { name: 'Producto 3', price: 300, inventoryStatus: 'InStock', image: 'p3.jpg' },
  { name: 'Producto 4', price: 400, inventoryStatus: 'InStock', image: 'p4.jpg' },
  { name: 'Producto 5', price: 500, inventoryStatus: 'InStock', image: 'p5.jpg' },
  { name: 'Producto 6', price: 600, inventoryStatus: 'InStock', image: 'p6.jpg' },
];

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})


export class ContenidoComponent implements OnInit {

  productosMasVendidos = ELEMENT_DATA;

  constructor() {

  }

  ngOnInit(): void {
  }

}
