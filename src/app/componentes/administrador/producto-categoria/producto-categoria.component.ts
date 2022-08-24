import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Categoria, ProductoDto } from 'src/app/modelos/productos';
import { CategoriaData, CategoriaDto, ProductoCategoriaService } from 'src/app/services/producto-categoria.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-producto-categoria',
  templateUrl: './producto-categoria.component.html',
  styleUrls: ['./producto-categoria.component.scss']
})

export class ProductoCategoriaComponent implements OnInit {

  categoriaDTO: CategoriaDto = {};
  productoDTO: ProductoDto = {};

  txtNombreCategoria: string = "";
  categorias: any = [];
  productos: any = [];
  totalRecords: number;
  formData = new FormData();

  nombreProducto = new FormControl('');
  selectedCategoria = new FormControl('');
  precioProducto = new FormControl('');
  stockProducto = new FormControl();

  @ViewChild('myInputFile')
  myInputFile: ElementRef;


  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(public productoCategoriaService: ProductoCategoriaService) { }

  ngOnInit(): void {

    this.llenarTablaCategorias();
    this.llenarTablaProductos();
    this.getProductoImage();

    /*this.productoCategoriaService.getCategorias().subscribe(
      data => {
        this.cat = data;
        console.log(data)
      },
      err => {
        alert("No se ha podido listar las categorias");
      }
    );
    */

    //this.productoCategoriaService.getCategorias().subscribe((data: CategoriaData[]) => this.cat = { ...data });

  }

  llenarTablaCategorias() {
    this.productoCategoriaService.getCategorias().subscribe(data => {
      this.categorias = [];
      for (const d of (data as any)) {
        this.categorias.push({
          id: d.id,
          nombreCategoria: d.nombreCategoria
        });
      }
    });
    this.totalRecords = this.categorias.length;
  }

  llenarTablaProductos() {
    this.productoCategoriaService.getProductos().subscribe(data => {
      //console.log(data);
      this.productos = [];
      for (const d of (data as any)) {
        this.productos.push({
          id: d.id,
          nombre: d.nombre,
          precio: d.precio,
          stock: d.stock,
          srcImage: d.srcImage,
          estado: d.estado,
          categoria: d.categoria
        });
      }
    });
  }



  guardarCategoria() {
    this.categoriaDTO.nombreCategoria = this.txtNombreCategoria;
    this.productoCategoriaService.guardarCategoria(this.categoriaDTO).subscribe(
      data => {
        alert("Categoria guardada con exito!")
        this.txtNombreCategoria = '';
        this.llenarTablaCategorias();
      },
      err => {
        alert("No se ha guardado la categoria");
      }
    );
  }

  guardarProducto() {
    for (const cat of this.categorias) {
      if (cat.id === this.selectedCategoria.value)
        this.productoDTO.categoria = cat;
    }

    let productoUpload = {
      nombre: this.nombreProducto.value,
      precio: this.precioProducto.value,
      stock: this.stockProducto.value,
      srcImage: '',
      estado: 'ACTIVO',
      categoria: {
        id: this.productoDTO.categoria?.id,
        nombreCategoria: this.productoDTO.categoria?.nombreCategoria
      }
    }

    //Añadimos a nuestro objeto formData nuestro objeto convertido a String
    this.formData.append("producto", JSON.stringify(productoUpload));

    this.productoCategoriaService.guardarProducto(this.formData).subscribe(
      data => {
        alert("Producto guardado con exito!")
        this.productoDTO = {};
        this.formData = new FormData();
        this.nombreProducto.reset();
        this.precioProducto.reset();
        this.stockProducto.reset();
        this.myInputFile.nativeElement.value = '';
        console.log(data);
        this.llenarTablaProductos();
      },
      err => {
        alert("No se ha guardado el producto");
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append("fichero", file);
  }

  getProductoImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.productoCategoriaService.getProducto('11')
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrieveResonse);
        }
      );
  }

}
