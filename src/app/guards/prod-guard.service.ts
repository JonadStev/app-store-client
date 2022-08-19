import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate {

  realRol: string = "";

  constructor(
    private tokenService: TokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRol = route.data['expectedRol'];

    if (this.tokenService.isAdmin()) {
      this.realRol = 'admin';
    } else if (this.tokenService.isDelivery()) {
      this.realRol = 'delivery';
    } else {
      this.realRol = 'user';
    }

    if (!this.tokenService.isLogger() || expectedRol.indexOf(this.realRol) < 0) {
      window.location.replace('/');
      return false;
    }
    return true;
  }
}
