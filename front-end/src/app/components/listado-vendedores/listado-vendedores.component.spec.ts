import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVendedoresComponent } from './listado-vendedores.component';

describe('ListadoVendedoresComponent', () => {
  let component: ListadoVendedoresComponent;
  let fixture: ComponentFixture<ListadoVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoVendedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
