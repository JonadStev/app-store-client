import { Component, OnInit } from '@angular/core';
import { ProductoDto } from 'src/app/modelos/productos';
import { ProductoCategoriaService } from 'src/app/services/producto-categoria.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import { TiendaService } from 'src/app/services/tienda.service';

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

  //productosMasVendidos = ELEMENT_DATA;

  images: any[];
  productosMasVendidos: any[];
  productosPromociones: any[];

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

  constructor(private productService: ProductoCategoriaService, private tiendaService: TiendaService) {

  }

  ngOnInit(): void {
    this.obtenerBanners();
    this.getProductosMasVendidos();
    this.getPromociones();
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

  getProductosMasVendidos() {
    this.productService.getProductosMasVendidos().subscribe(data => {
      this.productosMasVendidos = [];
      for (const d of (data as any)) {
        this.productosMasVendidos.push({
          id: d.id,
          name: d.nombre,
          price: d.precio,
          inventoryStatus: 'En Stock',
          previewImageSrc: 'data:image/jpg;base64,' + d.picByte
        });
      }
    });
  }

  getPromociones() {
    this.tiendaService.getProductosPromocion().subscribe(data => {
      this.productosPromociones = [];
      for (const d of (data as any)) {
        this.productosPromociones.push({
          id: d.id,
          name: d.nombre,
          price: d.precio,
          inventoryStatus: 'En Stock',
          previewImageSrc: 'data:image/jpg;base64,' + d.picByte
        });
      }
    });
  }
}
