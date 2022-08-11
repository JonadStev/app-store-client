import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/modelos/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  displayLogin: boolean = false;
  displayRegister: boolean = false;
  displayStore: boolean = false;

  loginUsuario?: LoginUsuario;

  usernameText?: string;
  passwordText?: string;

  isLogged: boolean = false;
  usuarioLogeado?: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogger();
    if (this.isLogged) {
      if (this.tokenService.getUserName() != "user") {
        this.usuarioLogeado = this.tokenService.getUserName() as string;
      }
    }
  }

  onLogin() {
    if (this.usernameText === undefined || this.passwordText === undefined || this.usernameText === "" || this.passwordText === "") {
      alert("Debe ingresar las credenciales");
    } else {
      this.loginUsuario = new LoginUsuario(this.usernameText as string, this.passwordText as string);
      console.log(this.loginUsuario.nombreUsuario + " - " + this.loginUsuario.password);

      this.authService.login(this.loginUsuario).subscribe(
        data => {
          console.log("Token " + data.token as string);
          this.tokenService.setToken(data.token as string);
          this.isLogged = true;
          this.displayLogin = false;
          this.usuarioLogeado = this.tokenService.getUserName() as string;
        },
        err => {
          alert("Usuario y/o contraseña incorrecta");
        }
      );


    }
  }

  logOut() {
    this.tokenService.logOut();
  }


}
