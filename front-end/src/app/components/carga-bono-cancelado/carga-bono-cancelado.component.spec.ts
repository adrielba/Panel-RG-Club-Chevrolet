import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaBonoCanceladoComponent } from './carga-bono-cancelado.component';

describe('CargaBonoCanceladoComponent', () => {
  let component: CargaBonoCanceladoComponent;
  let fixture: ComponentFixture<CargaBonoCanceladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargaBonoCanceladoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaBonoCanceladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
