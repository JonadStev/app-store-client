import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProveedorDto } from 'src/app/modelos/ProveedorDTO';
import { RepartidorDto } from 'src/app/modelos/Repartidor';
import { AuthService } from 'src/app/services/auth.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedores-repartidores',
  templateUrl: './proveedores-repartidores.component.html',
  styleUrls: ['./proveedores-repartidores.component.scss']
})
export class ProveedoresRepartidoresComponent implements OnInit {

  proveedorDTO: ProveedorDto = {};
  repartidorDTO: RepartidorDto = {};
  proveedores: ProveedorDto[];
  repartidores: RepartidorDto[];
  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string;
  selectedEstadoUsuario?: string;;

  selectedProveedor: ProveedorDto;

  roles: any[] = [{ id: 1, nombre: "admin" }, { id: 2, nombre: "user" }, { id: 2, nombre: "delivery" }];
  selectedRol?: string;

  idEdit: boolean = false;

  constructor(private proveedorService: ProveedorService,
    private authService: AuthService,
    private deliveryService: DeliveryService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.getProveedores();
    this.getRepartidores();
  }

  guardarProveedor() {
    if (this.selectedEstado === '' || this.selectedEstado === undefined)
      this.proveedorDTO.estado = 'ACTIVO';
    else
      this.proveedorDTO.estado = this.selectedEstado

    if (this.proveedorDTO.nombre === '' || this.proveedorDTO.correo === '' || this.proveedorDTO.telefono === '' ||
      this.proveedorDTO.nombre === undefined || this.proveedorDTO.correo === undefined || this.proveedorDTO.telefono === undefined) {
      //alert("Debe ingresar los datos del proveedor");
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar los datos del proveedor.' });
      return;
    }
    this.proveedorService.guardarProveedor(this.proveedorDTO).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Proveedor guardado con éxito.' });
      this.proveedorDTO = {};
      this.selectedEstado = '';
      this.getProveedores();
    })
  }

  getProveedores() {
    this.proveedorService.getProveedores().subscribe(data => {
      this.proveedores = data;
    })
  }

  guardarUsuario() {
    if (this.idEdit) {
      this.editarUsuario();
      return;
    }
    this.repartidorDTO.roles = [this.selectedRol as string];
    this.repartidorDTO.password = '1234';
    this.repartidorDTO.estado = this.selectedEstadoUsuario;
    if (this.repartidorDTO.nombre === '' || this.repartidorDTO.nombre === undefined ||
      this.repartidorDTO.nombreUsuario === '' || this.repartidorDTO.nombreUsuario === undefined ||
      this.repartidorDTO.email === '' || this.repartidorDTO.email === undefined ||
      this.repartidorDTO.direccion === '' || this.repartidorDTO.direccion === undefined ||
      this.selectedRol === '' || this.selectedRol === null || this.selectedRol === undefined ||
      this.selectedEstadoUsuario === '' || this.selectedEstadoUsuario === null || this.selectedEstadoUsuario === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar todos los datos del usuario.' });
      return;
    }
    this.authService.nuevo(this.repartidorDTO).subscribe(
      data => {
        console.log('ENTRA POR DATA ' + data)
      },
      err => {
        if (err.status === 400)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en registrar al usuario.' });
        else {
          this.getRepartidores();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario creado exitosamente.' });
          this.repartidorDTO = {};
          this.selectedRol = '';
          this.selectedEstadoUsuario = '';
        }
      }
    );
  }

  editarUsuario() {
    console.log("EDITANDO...");
    let roles: any = [];
    if (this.repartidorDTO.nombre === '' || this.repartidorDTO.nombre === undefined || this.repartidorDTO.nombre === null ||
      this.repartidorDTO.nombreUsuario === '' || this.repartidorDTO.nombreUsuario === undefined || this.repartidorDTO.nombre === null ||
      this.repartidorDTO.email === '' || this.repartidorDTO.email === undefined || this.repartidorDTO.nombre === null ||
      this.repartidorDTO.direccion === '' || this.repartidorDTO.direccion === undefined || this.repartidorDTO.direccion === null ||
      this.selectedRol === '' || this.selectedRol === null || this.selectedRol === undefined ||
      this.selectedEstadoUsuario === '' || this.selectedEstadoUsuario === null || this.selectedEstadoUsuario === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar todos los datos del usuario.' });
      return;
    }
    if (this.selectedRol === 'admin') {
      roles.push({ id: 1, rolNombre: 'ROLE_ADMIN' }, { id: 2, rolNombre: 'ROLE_USER' }, { id: 3, rolNombre: 'ROLE_DELIVERY' });
    } else if (this.selectedRol === 'user') {
      roles.push({ id: 2, rolNombre: 'ROLE_USER' });
    } else {
      roles.push({ id: 3, rolNombre: 'ROLE_DELIVERY' });
    }
    this.repartidorDTO.estado = this.selectedEstadoUsuario;
    this.repartidorDTO.roles = roles;
    this.authService.actualizarUsuario(this.repartidorDTO).subscribe(data => {
      this.getRepartidores();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario actualizado.' });
      this.repartidorDTO = {};
      this.selectedRol = '';
      this.selectedEstadoUsuario = '';
    });
  }

  getRepartidores() {
    this.deliveryService.getRepartidores().subscribe(data => {
      this.repartidores = data;
    })
  }

  onRowSelect(event: any) {
    this.proveedorDTO = event.data
    this.selectedEstado = this.proveedorDTO.estado;
  }

  onRowUnselect(event: any) {
    this.proveedorDTO = {};
    this.selectedEstado = '';
  }

  onRowSelectUser(event: any) {
    this.repartidorDTO = event.data;
    this.selectedEstadoUsuario = event.data.estado;
    console.log(this.repartidorDTO);
    if (this.repartidorDTO.roles?.length === 3) {
      this.selectedRol = 'admin';
    } else {
      for (const d of (this.repartidorDTO.roles as any)) {
        if (d.rolNombre === 'ROLE_USER')
          this.selectedRol = 'user';
        else
          this.selectedRol = 'delivery';
      }
    }
    this.idEdit = true;
  }

  onRowUnselectUser(event: any) {
    this.repartidorDTO = {};
    this.idEdit = false;
    this.selectedEstadoUsuario = '';
    this.selectedRol = '';
  }

}
