import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarritoDto } from 'src/app/modelos/carrito';
import { ProductoDto } from 'src/app/modelos/productos';
import { CategoriaDto, ProductoCategoriaService } from 'src/app/services/producto-categoria.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {


  categorias: CategoriaDto[];
  selectedCategoria: string;
  productos: ProductoDto[];

  sortOrder: number;

  sortField: string;

  addCar: CarritoDto = {};

  nombreProductoBuscar: string;

  sortOptions: any[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];

  constructor(public productoCategoriaService: ProductoCategoriaService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private tiendaService: TiendaService) { }

  ngOnInit(): void {
    this.llenarCategorias();
    this.llenarProductos();
  }

  llenarCategorias() {
    this.productoCategoriaService.getCategoriasTienda().subscribe(data => {
      this.categorias = data;
    });
  }

  llenarProductos() {
    this.productoCategoriaService.getProductosTienda().subscribe(data => {
      this.productos = data;
    });
  }

  buscarProducto() {
    if (this.nombreProductoBuscar === undefined || this.nombreProductoBuscar === '') {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Ingrese el nombre del producto que desea buscar.' });
      return;
    }
    this.productoCategoriaService.getProductosByLikeNombre(this.nombreProductoBuscar).subscribe(data => {
      if (data.length === 0) {
        this.messageService.add({ severity: 'info', summary: 'Información', detail: 'No se han encontrado productos con el nombre ' + this.nombreProductoBuscar });
        this.llenarProductos();
      } else {
        this.productos = data;
      }
      this.nombreProductoBuscar = '';
    });
  }

  buscarProductoPorCategoria() {
    this.productoCategoriaService.getProductosfindByCategory(this.selectedCategoria).subscribe(data => {
      if (data.length === 0) {
        this.messageService.add({ severity: 'info', summary: 'Información', detail: 'No se han encontrado productos con la categoria seleccionada.' });
        this.llenarProductos();
      } else {
        this.productos = data;
      }
    })
  }

  limpiarFilto() {
    this.selectedCategoria = '';
    this.llenarProductos();
  }

  addToCar(producto: ProductoDto) {
    if (this.tokenService.isLogger()) {
      this.addCar.usuario = this.tokenService.getUserNameByToken();
      this.addCar.idProducto = producto.id
      this.addCar.nombreProducto = producto.nombre
      this.addCar.precio = producto.precio
      this.addCar.cantidad = 1
      this.addCar.fecha = ''
      this.addCar.estado = 'ABIERTO'
      this.tiendaService.guardarCarrito(this.addCar).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Producto agregado al carrito.' });
        this.addCar = {};
      });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Inicie sesión para agregar los productos al carrito.' });
    }
  }


}
