import { Pipe, PipeTransform } from '@angular/core';

import { Contacto } from './contacto';

@Pipe({
  name: 'OrdenacionContactos'
})
export class OrdenacionContactosPipe implements PipeTransform {

  transform(contactos: Contacto[], ascendente: boolean): Contacto[] {

    let ordenados: Contacto[];
    let polaridadContactoAContactoB: number = ascendente ? 1 : -1;
    let polaridadContactoBContactoA: number = ascendente ? -1 : 1;

    // Si contactos tiene valor, procedemos con la ordenación.
    if (contactos && contactos.length > 1) {

      ordenados = contactos.sort((a: Contacto, b: Contacto): number => {

        let orden: number;
        let nombreContactoA = a.nombre.toLowerCase();
        let nombreContactoB = b.nombre.toLowerCase();

        if (nombreContactoA > nombreContactoB) {
          orden = polaridadContactoAContactoB;
        }
        else if (nombreContactoA < nombreContactoB) {
          orden = polaridadContactoBContactoA;
        }
        else {
          orden = 0;
        }

        return orden;
      });
    }

    // Si contactos es nulo.
    else {
      ordenados = [];
    }

    return ordenados;

  }

}
