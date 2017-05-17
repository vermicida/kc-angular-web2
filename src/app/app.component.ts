import { Component, OnInit } from '@angular/core';

import { ContactoService } from './contacto.service';
import { Contacto } from './contacto';

@Component({
  // Selector CSS del elemento donde se instanciará el componente.
  selector: 'app-root',
  // Ruta al template correspondiente al componente.
  templateUrl: './app.component.html',
  // Ruta al CSS correspondiente al componente.
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Los atributos de clase no necesitan ser definidos con 'let'.
  // Aunque los atributos se marquen como privados, siguen siendo visibles para el template.
  private _title: string;
  private _listaContactos: Contacto[];

  // Para hacer una inyección de dependencias debemos indicar en el
  // constructor de una clase un parámetro tipado precisamente con
  // el servicio que queremos usar. Además debemos añadir siempre
  // el modificador de acceso.
  constructor(private _contactoService: ContactoService) { }

  // Este método es de obligatoria implementación cuando usamos la interfaz 'OnInit'. Puesto que no retorna nada, podemos anotarlo como 'void'. Este método se ejecuta al instanciarse la clase 'AppComponent'.
  ngOnInit(): void {
    this._title = 'Super Agenda';
    this._listaContactos = this._contactoService.obtenerContactos();
  }

  // Este manejador se encarga de mostrar un mensaje de aviso de eliminación con el contacto indicado.
  avisarEliminacionContacto(contacto: Contacto): void {
    if (confirm(`¿Estás seguro de eliminar a ${contacto.nombre}?`)) {
      this._contactoService.eliminarContacto(contacto);
      this._listaContactos = this._contactoService.obtenerContactos();
    }
  }

  // Este manejador se encarga de crear nuevos contactos en la app.
  darAltaContacto(contacto: Contacto): void {
    this._contactoService.crearContacto(contacto);
    this._listaContactos = this._contactoService.obtenerContactos();
  }
}
