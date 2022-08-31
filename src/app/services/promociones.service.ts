import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoDto } from '../modelos/productos';
import { PromocionDto } from '../modelos/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  adminUrl = environment.adminUrl;
  tiendaUrl = environment.tiendaUrl;

  constructor(private http: HttpClient) { }

  public guardarPromocion(promocion: PromocionDto): Observable<PromocionDto> {
    return this.http.post<PromocionDto>(this.adminUrl + 'savePromocion', promocion);
  }

  public actulizarPromocion(promocion: PromocionDto): Observable<PromocionDto> {
    return this.http.post<PromocionDto>(this.adminUrl + 'updatePromocion', promocion);
  }

  public getPromociones(): Observable<PromocionDto[]> {
    return this.http.get<PromocionDto[]>(this.adminUrl + 'promociones');
  }


}
