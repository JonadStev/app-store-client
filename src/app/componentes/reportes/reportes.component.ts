import { Component, OnInit } from '@angular/core';
import { ReporteVentasDto } from 'src/app/modelos/reporteVentas';
import { ReportesService } from 'src/app/services/reportes.service';
import jsPDF from 'jspdf';
import { UserOptions } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => void;
}

const doc = new jsPDF() as jsPDFCustom;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  reporteVentas: ReporteVentasDto[];

  fechaDesde: Date;
  fechaHasta: Date;

  constructor(private reporteVentasService: ReportesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getReporteVentas();
  }

  getReporteVentas() {
    this.reporteVentas = [];
    this.reporteVentasService.getReporteVetnas().subscribe(data => {
      this.reporteVentas = data;
    });
  }

  getReporteVentasByFecha() {
    console.log(this.fechaDesde + ' ' + this.fechaDesde);
    if (this.fechaDesde === undefined || this.fechaHasta === undefined || this.fechaDesde === null || this.fechaHasta === null) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe seleccionar la fecha desde y fecha hasta.' });
      return;
    }
    this.reporteVentas = [];
    this.reporteVentasService.getReporteVentasByFecha(this.fechaDesde.toLocaleDateString(), this.fechaHasta.toLocaleDateString()).subscribe(data => {
      this.reporteVentas = data;
    });
  }

  exportarPdf() {

    const head = [['id', 'orden', 'cliente', 'producto', 'cantidad', 'precio', 'subtotal', 'iva', 'total', 'fecha']];
    const datos: any[] = [];
    this.reporteVentas.map(x => {
      datos.push([x.id, x.orden, x.cliente, x.producto, x.cantidad, x.precio, x.subtotal, x.iva, x.total, x.fecha]);
    });
    doc.text('REPORTE DE VENTAS "AQUI ME QUEDO"', 10, 10);
    doc.text('Productos vendidos', 10, 20);
    doc.autoTable({
      head: head,
      body: datos,
      startY: 30,
      didDrawCell: (data) => { },
    });
    doc.save('ReporteVentas.pdf');
    this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Successs', detail: 'Reporte de ventas generado.' });
  }

}
