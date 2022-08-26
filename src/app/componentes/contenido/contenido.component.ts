import { Component, OnInit } from '@angular/core';
import { ProductoCategoriaService } from 'src/app/services/producto-categoria.service';

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

  images: any[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private productService: ProductoCategoriaService) {

  }

  ngOnInit(): void {
    this.obtenerBanners();
  }

  obtenerBanners() {
    this.productService.getBannersTienda().subscribe(data => {
      this.images = [];
      for (const d of (data as any)) {
        this.images.push({
          previewImageSrc: 'data:image/jpg;base64,' + d.picByte,
          thumbnailImageSrc: 'data:image/jpg;base64,' + d.picByte,
          alt: d.descripcion,
          title: d.descripcion
        });
      }
    });
  }

}
