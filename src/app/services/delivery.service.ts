import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RepartidorDto } from '../modelos/Repartidor';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  adminUrl = environment.adminUrl;

  constructor(private http: HttpClient) { }

  public getRepartidores(): Observable<RepartidorDto[]> {
    return this.http.get<RepartidorDto[]>(this.adminUrl + 'getDeliverys');
  }
}
