import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { MisContactosComponent } from './mis-contactos.component';
import { ListaContactosComponent } from '../lista-contactos/lista-contactos.component';
import { DetallesContactoComponent } from '../detalles-contacto/detalles-contacto.component';
import { OrdenacionContactosPipe } from '../ordenacion-contactos.pipe';
import { DatosContactoPipe } from '../datos-contacto.pipe';
import { ContactoService } from '../contacto.service';
import { ApiUrlProvider } from '../configuracion';

describe('MisContactosComponent', () => {
  let component: MisContactosComponent;
  let fixture: ComponentFixture<MisContactosComponent>;

  beforeEach(async(() => {
    // Configuramos el módulo de testing necesario para probar las pruebas aquí definidas.
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [
        MisContactosComponent,
        ListaContactosComponent,
        DetallesContactoComponent,
        OrdenacionContactosPipe,
        DatosContactoPipe
      ],
      providers: [
        ContactoService,
        ApiUrlProvider
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería instanciarse', () => {
    expect(component).toBeTruthy();
  });

  // Usamos 'inject' para hacer inyección de dependencias.
  it(
    'Debería solicitar los contactos y almacenarlos en el componente',
    inject([ContactoService], (contactoService: ContactoService) => {

      // Definimos unos datos mockeados.
      let contactosMockeados = [1, 2, 3];

      // Interceptamos todas las llamadas a 'obtenerContacto' del servicio y falseamos su resultado.
      spyOn(contactoService, 'obtenerContactos').and.callFake(() => {
        return Observable.from([contactosMockeados]);
      });

      // Forzamos el hook 'OnInit' para hacer la llamada al servicio.
      component.ngOnInit();

      // Comprobamos que los datos que exponemos en el componente son los correctos.
      expect(component._listaContactos).toBe(contactosMockeados);

    }));
});
