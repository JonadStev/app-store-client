import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { CarritoDto } from 'src/app/modelos/carrito';
import { OrdenDto } from 'src/app/modelos/orden';
import { ReporteVentasDto } from 'src/app/modelos/reporteVentas';
import { ReportesService } from 'src/app/services/reportes.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { TokenService } from 'src/app/services/token.service';
import jsPDF from 'jspdf';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

const doc = new jsPDF() as jsPDFCustom;

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {

  addCarrito: CarritoDto[];
  reporteOrdenCompra: ReporteVentasDto[];

  totalCarrito: number = 0;

  formaPago: any[] = [{ id: 1, nombre: "EFECTIVO" }, { id: 2, nombre: "TARJETA DEBITO/CREDITO" }]
  selectedPago?: string;
  blockInput: boolean;
  nombreTarjeta = new FormControl('');
  numeroTarjeta = new FormControl('');
  fechaTarjeta = new FormControl('');
  codigoTarjeta = new FormControl('');
  direccionCredito = new FormControl('');

  orden: OrdenDto = {};

  msgs: Message[];
  direccionEfectivo: string;

  sizeCarrito: number;
  strCarritoSize: string = '';

  constructor(private tokenService: TokenService,
    private messageService: MessageService,
    private tiendaService: TiendaService,
    private reporteService: ReportesService) { }

  ngOnInit(): void {
    this.llenarCarrito();
    this.selectedPago = 'TARJETA DEBITO/CREDITO';
    this.msgs = [
      { severity: 'info', summary: 'Información', detail: 'Los pagos en efectivos se deben efectuar en el momento de la entrega de los productos, directamente al repartidor!' },
    ];
  }

  llenarOrden() {
    if (this.selectedPago === 'EFECTIVO') {
      this.orden.direccionEnvio = this.direccionEfectivo
    } else {
      this.orden.direccionEnvio = this.direccionCredito.value as string;
    }
    this.orden.metodoPago = this.selectedPago;
    this.orden.estadoPedido = 'ABIERTO';
    this.orden.usuario = this.tokenService.getUserNameByToken();
    this.orden.carrito = this.addCarrito;

  }

  limpiarPago() {
    this.nombreTarjeta.setValue('');
    this.numeroTarjeta.setValue('');
    this.fechaTarjeta.setValue('');
    this.codigoTarjeta.setValue('');
    this.direccionCredito.setValue('');
    this.direccionEfectivo = '';
  }

  llenarCarrito() {
    this.totalCarrito = 0;
    if (this.tokenService.isLogger()) {
      this.tiendaService.getCarritoByUsername(this.tokenService.getUserNameByToken()).subscribe(data => {
        this.addCarrito = data;
        this.strCarritoSize = data.length.toString();
        console.log(data.length.toString());
        for (const d of (this.addCarrito as any)) {
          let precio = d.precio as number * d.cantidad;
          this.totalCarrito += precio;
          d.fecha = '';
        }
        this.totalCarrito = +this.totalCarrito.toPrecision(4);
      });
    }
  }

  seleccionPago() {
    if (this.selectedPago === 'EFECTIVO')
      this.blockInput = true;
    else
      this.blockInput = false;
    console.log(this.blockInput);
    //console.log(this.nombreTarjeta.value);
  }

  pagoCredito() {
    if (
      this.nombreTarjeta === null || this.nombreTarjeta === undefined || this.nombreTarjeta.value === '' || this.nombreTarjeta.value === null ||
      this.numeroTarjeta === null || this.numeroTarjeta === undefined || this.numeroTarjeta.value === '' || this.numeroTarjeta.value === null ||
      this.fechaTarjeta === null || this.fechaTarjeta === undefined || this.fechaTarjeta.value === '' || this.fechaTarjeta.value === null ||
      this.codigoTarjeta === null || this.codigoTarjeta === undefined || this.codigoTarjeta.value === '' || this.codigoTarjeta.value === null ||
      this.direccionCredito === null || this.direccionCredito === undefined || this.direccionCredito.value === '' || this.direccionCredito.value === null
    ) {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Debe llenar todos los campos del formulario de pago.' });
      return;
    }
    this.llenarOrden();
    if (this.strCarritoSize === '0' || this.strCarritoSize === '') {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'No se han encontrado productos en el carrito.' });
      return;
    }
    this.tiendaService.guardarOrden(this.orden).subscribe(data => {
      console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha generado la ORDEN DE COMPRA NO. ' + data.ORDEN_COMPRA });
      this.generarOrdenCompra(data.ORDEN_COMPRA, this.totalCarrito);
      this.limpiarPago();
      this.llenarCarrito();
    });

  }

  pagoEfectivo() {
    if (this.direccionEfectivo === null || this.direccionEfectivo === '' || this.direccionEfectivo === undefined) {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Debe llenar todos los campos del formulario de pago.' });
      return;
    }
    this.llenarOrden();
    if (this.strCarritoSize === '0' || this.strCarritoSize === '') {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'No se han encontrado productos en el carrito.' });
      return;
    }
    this.tiendaService.guardarOrden(this.orden).subscribe(data => {
      console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha generado la ORDEN DE COMPRA NO. ' + data.ORDEN_COMPRA });
      this.generarOrdenCompra(data.ORDEN_COMPRA, this.totalCarrito);
      this.limpiarPago();
      this.llenarCarrito();
    });
  }

  generarOrdenCompra(idOrden: string, totalCarrito: number) {
    this.reporteOrdenCompra = [];
    this.reporteService.getReporteOrdenCompra(idOrden).subscribe(data => {
      this.reporteOrdenCompra = data;
      this.generarReporte(idOrden, totalCarrito);
    });
  }

  generarReporte(idOrden: string, totalCarrito: number) {
    const head = [['producto', 'cantidad', 'precio', 'subtotal', 'iva', 'total', 'fecha']];
    const datos: any[] = [];
    this.reporteOrdenCompra.map(x => {
      datos.push([x.producto, x.cantidad, x.precio, x.subtotal, x.iva, x.total, x.fecha]);
    });
    doc.text('ORDEN DE COMPRA "AQUI ME QUEDO"', 10, 10);
    doc.text('No. orden de compra generada: ' + idOrden, 10, 20);
    doc.text('Forma de pago: ' + this.selectedPago, 10, 30);
    doc.text('Total $: ' + totalCarrito, 10, 40);
    doc.text('Detalle de productos: ', 10, 50);
    doc.autoTable({
      head: head,
      body: datos,
      startY: 60,
      didDrawCell: (data) => { },
    });
    doc.save('OrdenDeCompra.pdf');
  }

}
