import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrdenEntregaDto } from 'src/app/modelos/ordenEntrega';
import { TiendaService } from 'src/app/services/tienda.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-repartidor',
  templateUrl: './repartidor.component.html',
  styleUrls: ['./repartidor.component.scss']
})
export class RepartidorComponent implements OnInit {

  ordenes: OrdenEntregaDto[];
  ordenesAsignadas: OrdenEntregaDto[];
  idOrden: string;
  idOrdenAsignada: string;
  usuarioRepartidor: string;
  constructor(private tokenService: TokenService,
    private messageService: MessageService,
    private tiendaService: TiendaService) { }

  ngOnInit(): void {
    this.llenarOrdenes();
    if (this.tokenService.isLogger()) {
      this.usuarioRepartidor = this.tokenService.getUserNameByToken();
    }
    this.llenarOrdenesAsignadas();
  }

  llenarOrdenes() {
    this.tiendaService.getOrdenesEntrega().subscribe(data => {
      this.ordenes = data;
    })
  }

  llenarOrdenesAsignadas() {
    this.tiendaService.getOrdenesEntregaAsignadas(this.usuarioRepartidor).subscribe(data => {
      this.ordenesAsignadas = data;
    });
  }

  onRowSelect(event: any) {
    this.idOrden = event.data.id;
  }

  onRowSelectAsignada(event: any) {
    this.idOrdenAsignada = event.data.id;
  }

  onRowUnselect(event: any) {
    this.idOrden = '';
  }

  onRowUnselectAsignada(event: any) {
    this.idOrdenAsignada = '';
  }

  asignar(id: string) {
    if (id === '' || id === undefined) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe seleccionar una orden de entrega.' });
      return;
    }
    let httpParams = {
      usuarioRepartidor: this.usuarioRepartidor,
      idOrden: id
    };
    this.tiendaService.asignarRepartidorOrden(httpParams).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Success', detail: data.message });
      this.idOrden = '';
      this.llenarOrdenes();
      this.llenarOrdenesAsignadas();
    });
    this.messageService.clear();
  }

  cerrarOrden(idAsignada: string) {
    if (idAsignada === '' || idAsignada === undefined) {
      this.messageService.add({ key: 'myKey2', severity: 'info', summary: 'Información', detail: 'Debe seleccionar una orden de entrega.' });
      return;
    }
    let httpParams = {
      usuarioRepartidor: this.usuarioRepartidor,
      idOrden: idAsignada
    };
    this.tiendaService.cerrarOrden(httpParams).subscribe(data => {
      this.messageService.add({ key: 'myKey2', severity: 'success', summary: 'Success', detail: data.message });
      this.llenarOrdenesAsignadas();
      this.idOrdenAsignada = '';
    });
    this.messageService.clear();
  }

}
