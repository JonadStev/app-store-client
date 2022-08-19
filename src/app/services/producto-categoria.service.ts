import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoDto } from '../modelos/productos';

export interface CategoriaDto {
  id?: number,
  nombreCategoria?: string
};

export interface CategoriaData {
  id: number,
  nombreCategoria: string
};


@Injectable({
  providedIn: 'root'
})

export class ProductoCategoriaService {

  adminUrl = environment.adminUrl;

  constructor(private httpClient: HttpClient) { }

  public guardarCategoria(categoria: CategoriaDto): Observable<CategoriaDto> {
    return this.httpClient.post<CategoriaDto>(this.adminUrl + 'saveCategoria', categoria);
  }

  public getCategorias(): Observable<CategoriaData[]> {
    return this.httpClient.get<CategoriaData[]>(this.adminUrl + 'getCategorias');
  }

  public getProductos(): Observable<ProductoDto[]> {
    return this.httpClient.get<ProductoDto[]>(this.adminUrl + 'getProductos');
  }

  public guardarProducto(formData: FormData): Observable<ProductoDto> {
    return this.httpClient.post<ProductoDto>(this.adminUrl + 'saveProducto', formData);
  }


}
