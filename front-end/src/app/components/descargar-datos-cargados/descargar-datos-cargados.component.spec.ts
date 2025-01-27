import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarDatosCargadosComponent } from './descargar-datos-cargados.component';

describe('DescargarDatosCargadosComponent', () => {
  let component: DescargarDatosCargadosComponent;
  let fixture: ComponentFixture<DescargarDatosCargadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescargarDatosCargadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarDatosCargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
