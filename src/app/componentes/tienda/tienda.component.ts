import { Component, OnInit } from '@angular/core';
import { ProductoDto } from 'src/app/modelos/productos';
import { CategoriaDto, ProductoCategoriaService } from 'src/app/services/producto-categoria.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {


  categorias: CategoriaDto[];
  selectedCategoria?: string;
  productos: ProductoDto[];

  constructor(public productoCategoriaService: ProductoCategoriaService) { }

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
      console.log(this.productos);
    });
  }

}
