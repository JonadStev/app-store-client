import { Component, OnInit } from '@angular/core';
import { ReporteVentasDto } from 'src/app/modelos/reporteVentas';
import { ReportesService } from 'src/app/services/reportes.service';
import jsPDF from 'jspdf';
import { UserOptions } from 'jspdf-autotable';

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

  constructor(private reporteVentasService: ReportesService) { }

  ngOnInit(): void {
    this.getReporteVentas();
  }

  getReporteVentas() {
    this.reporteVentasService.getReporteVetnas().subscribe(data => {
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
    doc.autoTable({
      head: head,
      body: datos,
      startY: 50,
      didDrawCell: (data) => { },
    });

    doc.save('table.pdf');
  }

}
