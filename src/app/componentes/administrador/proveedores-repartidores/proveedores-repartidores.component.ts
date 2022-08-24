import { Component, OnInit } from '@angular/core';
import { ProveedorDto } from 'src/app/modelos/ProveedorDTO';
import { RepartidorDto } from 'src/app/modelos/Repartidor';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(public proveedorService: ProveedorService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  guardarProveedor() {
    this.proveedorDTO.estado = 'ACTIVO';
    if (this.proveedorDTO.nombre === '' || this.proveedorDTO.correo === '' || this.proveedorDTO.telefono === '' ||
      this.proveedorDTO.nombre === undefined || this.proveedorDTO.correo === undefined || this.proveedorDTO.telefono === undefined) {
      alert("Debe ingresar los datos del proveedor");
      return;
    }
    this.proveedorService.guardarProveedor(this.proveedorDTO).subscribe(data => {
      alert("Proveedor guardado con éxito");
      this.proveedorDTO = {};
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


}
