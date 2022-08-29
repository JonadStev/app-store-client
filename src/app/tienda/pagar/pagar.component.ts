import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { CarritoDto } from 'src/app/modelos/carrito';
import { OrdenDto } from 'src/app/modelos/orden';
import { TiendaService } from 'src/app/services/tienda.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {

  addCarrito: CarritoDto[];

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


  constructor(private tokenService: TokenService,
    private messageService: MessageService,
    private tiendaService: TiendaService) { }

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
        for (const d of (this.addCarrito as any)) {
          let precio = d.precio as number * d.cantidad;
          this.totalCarrito += precio;
          d.fecha = '';
        }
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
    this.llenarOrden();
    //console.log(this.orden);
    this.tiendaService.guardarOrden(this.orden).subscribe(data => {
      console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha generado la ORDEN DE COMPRA NO. ' + data.ORDEN_COMPRA });
      this.limpiarPago();
      this.llenarCarrito();
    });

  }

  pagoEfectivo() {
    this.llenarOrden();
    this.tiendaService.guardarOrden(this.orden).subscribe(data => {
      console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha generado la ORDEN DE COMPRA NO. ' + data.ORDEN_COMPRA });
      this.limpiarPago();
      this.llenarCarrito();
    });
  }

}
