import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {



  options: any;

  overlays?: any[];

  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.options = {
      center: { lat: -2.128479, lng: -79.939132 },
      zoom: 12
    };
  }

  enviar() {

    if (
      this.nombre === undefined || this.nombre === null || this.nombre === '' ||
      this.correo === undefined || this.correo === null || this.correo === '' ||
      this.asunto === undefined || this.asunto === null || this.asunto === '' ||
      this.mensaje === undefined || this.mensaje === null || this.mensaje === ''
    ) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe ingresar los datos del formulario.' });
      return;
    }
    this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Te contactaremos', detail: 'Hemos recibido tu mensaje, pronto nos pondremos en contacto contigo.' });
    this.nombre = '';
    this.correo = '';
    this.asunto = '';
    this.mensaje = '';
  }

}
