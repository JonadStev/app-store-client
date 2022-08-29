import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarritoDto } from '../modelos/carrito';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  tiendaUrl = environment.tiendaUrl;

  constructor(private http: HttpClient) { }

  public guardarCarrito(carrito: CarritoDto): Observable<CarritoDto> {
    return this.http.post<CarritoDto>(this.tiendaUrl + 'saveCar', carrito);
  }

  public getCarritoByUsername(usuario: string): Observable<CarritoDto[]> {
    return this.http.get<CarritoDto[]>(this.tiendaUrl + 'getCarByUser/' + usuario);
  }

  public deleteCarritoItem(id: number): Observable<any> {
    return this.http.delete<any>(this.tiendaUrl + 'delete/' + id);
  }

  public deleteCarrito(): Observable<any> {
    return this.http.delete<any>(this.tiendaUrl + 'deleteAll');
  }


}
