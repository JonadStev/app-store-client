import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../modelos/jwt-dto';
import { LoginUsuario } from '../modelos/login-usuario';
import { NuevoUsuario } from '../modelos/nuevo-usuario';
import { RepartidorDto } from '../modelos/Repartidor';
import { ResetPasswordDto } from '../modelos/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authUrl;
  adminUrl = environment.adminUrl;

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  public actualizarUsuario(updateUsuario: RepartidorDto): Observable<RepartidorDto> {
    return this.httpClient.post<RepartidorDto>(this.adminUrl + 'updateUsuario', updateUsuario);
  }

  public cambiarContrasenia(reseteoContrasenia: ResetPasswordDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'restablecerPassword', reseteoContrasenia);
  }

}
