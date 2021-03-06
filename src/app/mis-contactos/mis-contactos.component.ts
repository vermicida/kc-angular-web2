import { Component, OnInit } from '@angular/core';

import { ContactoService } from '../contacto.service';
import { Contacto } from '../contacto';

@Component({
  selector: 'app-mis-contactos',
  templateUrl: './mis-contactos.component.html',
  styleUrls: ['./mis-contactos.component.css']
})
export class MisContactosComponent implements OnInit {

  _listaContactos: Contacto[];
  private _contactoSeleccionado: Contacto;

  // Para hacer una inyección de dependencias debemos indicar en el
  // constructor de una clase un parámetro tipado precisamente con
  // el servicio que queremos usar. Además debemos añadir siempre
  // el modificador de acceso.
  constructor(private _contactoService: ContactoService) { }

  // Este método es de obligatoria implementación cuando usamos la interfaz 'OnInit'. Puesto que no retorna nada, podemos anotarlo como 'void'. Este método se ejecuta al instanciarse la clase 'AppComponent'.
  ngOnInit() {
    this._contactoService
        .obtenerContactos()
        // Solo cuando nos suscribimos a un 'Observable' con la funcion 'subscribe', este
        // objeto se invoca y se realizan todas las operaciones indicadas.
        .subscribe((contactos: Contacto[]) => {
          this._listaContactos = contactos;
        });
  }

  // Este manejador se encarga de mostrar un mensaje de aviso de eliminación con el contacto indicado.
  avisarEliminacionContacto(contacto: Contacto): void {
    if (confirm(`¿Estás seguro de eliminar a ${contacto.nombre}?`)) {
      this._contactoService
          .eliminarContacto(contacto)
          .subscribe((contactoEliminado: Contacto) => {
            this._listaContactos = this._listaContactos.filter((c: Contacto): boolean => {
              return c.id !== contactoEliminado.id;
            });
          });
    }
  }

  verDetalles(contacto: Contacto): void {
    this._contactoSeleccionado = contacto;
  }

  // Navegamos al perfil del contacto en 'Facebook'.
  navegarFacebook(contacto: Contacto): void {
    window.open(contacto.obtenerRutaFacebook(), '_blank');
  }

  // Navegamos al perfil del contacto en 'Twitter'.
  navegarTwitter(contacto: Contacto): void {
    window.open(contacto.obtenerRutaTwitter(), '_blank');
  }

}
