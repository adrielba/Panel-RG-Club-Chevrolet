import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarBonosJugarComponent } from './descargar-bonos-jugar.component';

describe('DescargarBonosJugarComponent', () => {
  let component: DescargarBonosJugarComponent;
  let fixture: ComponentFixture<DescargarBonosJugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescargarBonosJugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarBonosJugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
