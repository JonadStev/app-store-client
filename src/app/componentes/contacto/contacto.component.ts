import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  constructor() { }

  options: any;

  overlays?: any[];

  ngOnInit() {
    this.options = {
      center: { lat: -2.128479, lng: -79.939132 },
      zoom: 12
    };
  }

}
