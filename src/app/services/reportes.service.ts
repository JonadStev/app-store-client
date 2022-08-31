import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReporteVentasDto } from '../modelos/reporteVentas';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  adminUrl = environment.adminUrl;
  tiendaUrl = environment.tiendaUrl;

  constructor(private http: HttpClient) { }

  public getReporteVetnas(): Observable<ReporteVentasDto[]> {
    return this.http.get<ReporteVentasDto[]>(this.adminUrl + 'ventas');
  }

}
