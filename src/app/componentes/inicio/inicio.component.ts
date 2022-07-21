import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  displayLogin: boolean = false;
  displayRegister: boolean = false;
  displayStore: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
