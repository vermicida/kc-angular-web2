import { Component, Input } from '@angular/core';

import { Contacto } from '../contacto';

@Component({
  selector: 'detalles-contacto',
  templateUrl: './detalles-contacto.component.html',
  styleUrls: ['./detalles-contacto.component.css']
})
export class DetallesContactoComponent {

  @Input() contacto: Contacto;

  constructor() { }

}
