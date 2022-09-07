import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResetPasswordDto } from 'src/app/modelos/reset-password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  nombreUsuario = new FormControl('');
  password = new FormControl('');
  resetPasswordDTO: ResetPasswordDto = {};

  constructor(private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  resetPassword() {
    if (
      this.nombreUsuario === null || this.nombreUsuario === undefined || this.nombreUsuario.value === null || this.nombreUsuario.value === '' ||
      this.password === null || this.password === undefined || this.password.value === null || this.password.value === ''
    ) {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Debe llenar todos los campos del formulario.' });
      return;
    }
    this.resetPasswordDTO.username = this.nombreUsuario.value;
    this.resetPasswordDTO.password = this.password.value;

    this.authService.cambiarContrasenia(this.resetPasswordDTO).subscribe(data => {
      this.messageService.add({ severity: 'info', summary: 'Información', detail: data.message });
      this.limpiar();
    });
  }

  limpiar() {
    this.nombreUsuario.setValue('');
    this.password.setValue('');
    this.resetPasswordDTO = {};
  }

}
