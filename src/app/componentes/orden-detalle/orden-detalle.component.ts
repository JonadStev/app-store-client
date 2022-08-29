import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdenDetalleDto } from 'src/app/modelos/ordenEntrega';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-orden-detalle',
  templateUrl: './orden-detalle.component.html',
  styleUrls: ['./orden-detalle.component.scss']
})
export class OrdenDetalleComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,
    private tiendaService: TiendaService) { }

  ordenDetailId: string;

  detalle: OrdenDetalleDto[];

  ngOnInit(): void {
    this.ordenDetailId = this.rutaActiva.snapshot.params['id'];
    this.llenarTablaDetalle();
  }

  llenarTablaDetalle() {
    this.tiendaService.getOrdenDetalleEntrega(this.ordenDetailId).subscribe(data => {
      this.detalle = data;
    })
  }

}
