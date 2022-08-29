import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  public setToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogger(): boolean {
    if (this.getToken())
      return true;
    else
      return false;
  }

  public getUserName(): string {
    if (!this.isLogger)
      return "user";
    else {
      const token = this.getToken();
      const payload = token?.split('.')[1] as string;
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const username = values.nombre;
      return username;
    }
  }

  public getUserNameByToken(): string {
    if (!this.isLogger)
      return "user";
    else {
      const token = this.getToken();
      const payload = token?.split('.')[1] as string;
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const username = values.username;
      return username;
    }
  }


  public isAdmin(): boolean {
    if (!this.isLogger)
      return false;
    else {
      const token = this.getToken();
      const payload = token?.split('.')[1] as string;
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
      if (roles.indexOf('ROLE_ADMIN') < 0) // No es admin
        return false;
      return true; // Es admin
    }
  }

  public isDelivery(): boolean {
    if (!this.isLogger)
      return false;
    else {
      const token = this.getToken();
      const payload = token?.split('.')[1] as string;
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
      if (roles.indexOf('ROLE_DELIVERY') < 0) // No es admin
        return false;
      return true; // Es admin
    }
  }

  public logOut(): void {
    window.localStorage.clear();
    window.location.replace('/')
  }

}
