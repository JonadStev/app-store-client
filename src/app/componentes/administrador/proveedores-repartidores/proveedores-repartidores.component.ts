import { Component, OnInit } from '@angular/core';
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

  constructor(private proveedorService: ProveedorService,
    private authService: AuthService,
    private deliveryService: DeliveryService) { }

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
      alert("Debe ingresar los datos del proveedor");
      return;
    }
    this.proveedorService.guardarProveedor(this.proveedorDTO).subscribe(data => {
      alert("Proveedor guardado con éxito");
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

  guardarRepartidor() {
    this.repartidorDTO.roles = ['delivery'];
    this.repartidorDTO.password = '1234';
    this.authService.nuevo(this.repartidorDTO).subscribe(
      data => {
        console.log('ENTRA POR DATA ' + data)
      },
      err => {
        if (err.status === 400)
          alert(err.error);
        else {
          alert('Delivery registrado con éxito!');
          this.repartidorDTO = {};
        }
      }
    );
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
    console.log(event.data);
  }


}
