import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BannerDto } from '../modelos/banner';
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
  authURL = environment.authUrl;
  tiendaUrl = environment.tiendaUrl;

  constructor(private httpClient: HttpClient) { }

  public guardarCategoria(categoria: CategoriaDto): Observable<CategoriaDto> {
    return this.httpClient.post<CategoriaDto>(this.adminUrl + 'saveCategoria', categoria);
  }

  public getCategorias(): Observable<CategoriaData[]> {
    return this.httpClient.get<CategoriaData[]>(this.adminUrl + 'getCategorias');
  }

  public getProductos(): Observable<ProductoDto[]> {
    return this.httpClient.get<ProductoDto[]>(this.adminUrl + 'productos');
  }

  public guardarProducto(formData: FormData): Observable<ProductoDto> {
    return this.httpClient.post<ProductoDto>(this.adminUrl + 'saveProducto', formData);
  }

  public getProducto(id: string): Observable<ProductoDto> {
    return this.httpClient.get<ProductoDto>(this.adminUrl + 'producto/' + id);
  }

  public guardarBanner(formData: FormData): Observable<BannerDto> {
    return this.httpClient.post<BannerDto>(this.adminUrl + 'saveBanner', formData);
  }

  public getBanner(id: string): Observable<BannerDto> {
    return this.httpClient.get<BannerDto>(this.adminUrl + 'banner/' + id);
  }

  public deleteBanner(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.adminUrl + 'banner/delete/' + id);
  }



  // TIENDA
  public getProductosTienda(): Observable<ProductoDto[]> {
    return this.httpClient.get<ProductoDto[]>(this.tiendaUrl + 'productos');
  }

  public getCategoriasTienda(): Observable<CategoriaData[]> {
    return this.httpClient.get<CategoriaData[]>(this.tiendaUrl + 'getCategorias');
  }

  public getBannersTienda(): Observable<BannerDto[]> {
    return this.httpClient.get<BannerDto[]>(this.tiendaUrl + 'banners');
  }

}
