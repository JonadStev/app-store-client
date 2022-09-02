import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductoDto } from 'src/app/modelos/productos';
import { PromocionDto } from 'src/app/modelos/promocion';
import { ProductoCategoriaService } from 'src/app/services/producto-categoria.service';
import { PromocionesService } from 'src/app/services/promociones.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {

  productos: ProductoDto[];
  productoIdSelected: string = '';
  productoIdUpdateSelected: string = '';
  descuento: string = '';
  descuentoUpdate: string = '';
  promocion: PromocionDto = {}
  promocionUpdate: PromocionDto = {}
  promociones: PromocionDto[];

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string;

  constructor(public productoCategoriaService: ProductoCategoriaService,
    private messageService: MessageService,
    private promocionService: PromocionesService) { }



  ngOnInit(): void {
    this.llenarTablaProductos();
    this.llenarPromociones();
  }

  llenarTablaProductos() {
    this.productoCategoriaService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  llenarPromociones() {
    this.promocionService.getPromociones().subscribe(data => {
      this.promociones = data;
    });
  }


  aplicarDescuento() {
    if (this.descuento === '' || this.productoIdSelected === '') {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Debe seleccionar un producto y registrar un descuento para guardar.' });
      return;
    }
    if (this.descuento === '0') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El porcentaje de descuento no puede ser cero.' });
      return
    }
    this.promocion.descuento = +this.descuento;
    this.promocionService.guardarPromocion(this.promocion).subscribe(data => {
      if (data === null) {
        this.messageService.add({ severity: 'info', summary: 'Información', detail: 'El producto ya tiene una promoción registrada.' });
        return;
      }
      this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'Promocion registrada.' });
      this.promocion = {};
      this.productoIdSelected = '';
      this.descuento = '';
      this.llenarPromociones();
    });
  }

  aplicarDescuentoActualizacion() {
    if (this.descuentoUpdate === '' || this.productoIdUpdateSelected === '') {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Debe seleccionar un producto y registrar un descuento para guardar.' });
      return;
    }
    if (this.descuentoUpdate === '0') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El porcentaje de descuento no puede ser cero.' });
      return
    }
    this.promocionUpdate.descuento = +this.descuentoUpdate;
    this.promocionService.actulizarPromocion(this.promocionUpdate).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'Promocion actualizada.' });
      this.promocionUpdate = {};
      this.productoIdUpdateSelected = '';
      this.descuentoUpdate = '';
      this.llenarPromociones();
    });
  }

  onRowSelectProduct(event: any) {
    this.productoIdSelected = event.data.id;
    this.promocion.idProducto = event.data.id;
    this.promocion.nombreProducto = event.data.nombre
    this.promocion.precio = event.data.precio;
    this.promocion.descuento = +this.descuento;
    this.promocion.estado = 'ACTIVO';
    console.log(this.promocion);
  }

  onRowUnselect(event: any) {
    this.promocion = {};
    this.productoIdSelected = '';
    this.descuento = '';
  }

  onRowSelectProductDescuento(event: any) {
    console.log(event.data);
    this.promocionUpdate = event.data;
    this.productoIdUpdateSelected = event.data.id;
    this.descuentoUpdate = event.data.descuento;
  }

  onRowUnselectDescuento(event: any) {
    this.promocionUpdate = {};
    this.productoIdUpdateSelected = '';
    this.descuentoUpdate = '';
  }


}

