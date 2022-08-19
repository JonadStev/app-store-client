import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/modelos/login-usuario';
import { NuevoUsuario } from 'src/app/modelos/nuevo-usuario';
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
  isAdmin: boolean = false;
  isDelivery: boolean = false;

  txtNombre: string = '';
  txtApellido: string = '';
  nuevoUsuario: NuevoUsuario = {};

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
      this.isAdmin = this.tokenService.isAdmin();
      this.isDelivery = this.tokenService.isDelivery();
    }
  }

  onLogin() {
    if (this.usernameText === undefined || this.passwordText === undefined || this.usernameText === "" || this.passwordText === "") {
      alert("Debe ingresar las credenciales");
    } else {
      this.loginUsuario = new LoginUsuario(this.usernameText as string, this.passwordText as string);

      this.authService.login(this.loginUsuario).subscribe(
        data => {
          console.log("Token " + data.token as string);
          this.tokenService.setToken(data.token as string);
          this.isLogged = true;
          this.displayLogin = false;
          this.usuarioLogeado = this.tokenService.getUserName() as string;
          window.location.replace('/');
        },
        err => {
          alert("Usuario y/o contraseña incorrecta");
        }
      );
    }
  }

  registrar() {
    this.nuevoUsuario.nombre = this.txtNombre + ' ' + this.txtApellido;
    this.nuevoUsuario.roles = ['user'];
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        console.log('ENTRA POR DATA ' + data)
      },
      err => {
        //console.log(err)
        if (err.status === 400)
          alert(err.error);
        else {
          alert('Usuario registrado con éxito, por favor inicie sesión con sus credenciales.');
          this.nuevoUsuario = {};
          this.txtNombre = '';
          this.txtApellido = '';
        }

      }
    );
  }


  logOut() {
    this.tokenService.logOut();
  }


}

