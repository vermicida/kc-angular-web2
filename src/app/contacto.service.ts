import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Desde 'rxjs/add/operator/x' extendemos los operadores por defecto de los
// objetos 'Observables' de RxJS.
import 'rxjs/add/operator/map';

import { Contacto } from './contacto';

// Una clase decorada con 'Injectable' se comporta como un servicio. Este decorador
// hace posible que el servicio pueda inyectarse como dependencia en otras clases.
@Injectable()
export class ContactoService {

  // Para poder hacer peticiones HTTP necesitamos el cliente correspondiente. Tenemos
  // que inyectarlo como dependencia para usarlo en el servicio.
  constructor(private _http: Http) { }

  // Obtiene una colección de contactos.
  obtenerContactos(): Observable<Contacto[]> {
    return this._http
               .get('http://localhost:3004/contactos')
               // Con el operador 'map' transformamos el 'Observable<Response>' que
               // retorna la función 'get' en un 'Observable<Contacto[]>' que es lo que
               // realmente necesitamos.
               .map((respuesta: Response) => {
                 return respuesta.json() as Contacto[];
               });
  }

  // Añadir el contato indicado.
  crearContacto(contacto: Contacto): Observable<Contacto> {
    return this._http
               .post('http://localhost:3004/contactos', contacto)
               .map((respuesta: Response) => {
                 return respuesta.json() as Contacto;
               });
  }

  // Elimina el contacto indicado.
  eliminarContacto(contacto: Contacto): Observable<Contacto> {
    return this._http
               .delete(`http://localhost:3004/contactos/${contacto.id}`)
               .map(() => {
                 return contacto;
               });
  }

}
