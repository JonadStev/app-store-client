import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProveedorDto } from '../modelos/ProveedorDTO';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  adminUrl = environment.adminUrl;

  constructor(private http: HttpClient) { }

  public guardarProveedor(proveedor: ProveedorDto): Observable<ProveedorDto> {
    return this.http.post<ProveedorDto>(this.adminUrl + 'saveProveedor', proveedor);
  }

  public getProveedores(): Observable<ProveedorDto[]> {
    return this.http.get<ProveedorDto[]>(this.adminUrl + 'proveedores');
  }

  public getProveedor(id: string): Observable<ProveedorDto> {
    return this.http.get<ProveedorDto>(this.adminUrl + 'proveedor/' + id);
  }

}
