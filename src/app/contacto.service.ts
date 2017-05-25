import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Desde 'rxjs/add/operator/x' extendemos los operadores por defecto de los
// objetos 'Observables' de RxJS.
import 'rxjs/add/operator/map';

import { Contacto } from './contacto';
import { ApiUrl } from './configuracion';

// Una clase decorada con 'Injectable' se comporta como un servicio. Este decorador
// hace posible que el servicio pueda inyectarse como dependencia en otras clases.
@Injectable()
export class ContactoService {

  // Para poder hacer peticiones HTTP necesitamos el cliente correspondiente. Tenemos
  // que inyectarlo como dependencia para usarlo en el servicio.
  constructor(
    private _http: Http,
    // Cuando solicitamos la inyección de dependencias de un valor, tenemos
    // que usar siempre el decorador 'Inject' indicando el token correspondiente.
    @Inject(ApiUrl) private _apiUrl) { }

  // Obtiene una colección de contactos.
  obtenerContactos(): Observable<Contacto[]> {
    return this._http
               .get(`${this._apiUrl}/contactos`)
               // Con el operador 'map' transformamos el 'Observable<Response>' que
               // retorna la función 'get' en un 'Observable<Contacto[]>' que es lo que
               // realmente necesitamos.
               .map((respuesta: Response) => {
                 // Recogemos la colección de objetos JSON de la respuesta y le
                 // damos comportamiento de 'colección de cualquier cosa'.
                 let contactosEnRespuesta: any[] = respuesta.json() as any[];
                 // Iteramos por la colección de objetos JSON y vamos instanciando
                 // objetos de tipo 'Contacto' por cada uno de ellos.
                  return contactosEnRespuesta.map((datos: any) => {
                    return Contacto.nuevoDesdeJson(datos);
                  });
               });
  }

  // Añadir el contato indicado.
  crearContacto(contacto: Contacto): Observable<Contacto> {
    return this._http
               .post(`${this._apiUrl}/contactos`, contacto)
               .map((respuesta: Response) => {
                 return Contacto.nuevoDesdeJson(respuesta.json());
               });
  }

  // Elimina el contacto indicado.
  eliminarContacto(contacto: Contacto): Observable<Contacto> {
    return this._http
               .delete(`${this._apiUrl}/contactos/${contacto.id}`)
               .map(() => {
                 return contacto;
               });
  }

}
