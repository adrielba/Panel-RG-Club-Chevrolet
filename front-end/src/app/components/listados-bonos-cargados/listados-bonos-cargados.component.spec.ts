import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosBonosCargadosComponent } from './listados-bonos-cargados.component';

describe('ListadosBonosCargadosComponent', () => {
  let component: ListadosBonosCargadosComponent;
  let fixture: ComponentFixture<ListadosBonosCargadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadosBonosCargadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadosBonosCargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
