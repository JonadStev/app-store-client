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

  selectedProveedor: ProveedorDto;

  roles: any[] = [{ id: 1, nombre: "admin" }, { id: 2, nombre: "user" }, { id: 2, nombre: "delivery" }];
  selectedRol?: string;

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
    this.repartidorDTO.roles = [this.selectedRol as string];
    this.repartidorDTO.password = '1234';
    console.log(this.repartidorDTO);
    this.authService.nuevo(this.repartidorDTO).subscribe(
      data => {
        console.log('ENTRA POR DATA ' + data)
      },
      err => {
        if (err.status === 400)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en registrar al usuario.' });
        else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario creado exitosamente.' });
          this.repartidorDTO = {};
          this.selectedRol = '';
        }
      }
    );
  }

  getRepartidores() {
    this.deliveryService.getRepartidores().subscribe(data => {
      this.repartidores = data;
      console.log(this.repartidores);
    })
  }

  onRowSelect(event: any) {
    this.proveedorDTO = event.data
    this.selectedEstado = this.proveedorDTO.estado;
  }

  onRowUnselect(event: any) {
    console.log(event.data);
  }


}
