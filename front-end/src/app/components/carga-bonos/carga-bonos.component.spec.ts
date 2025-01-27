import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaBonosComponent } from './carga-bonos.component';

describe('CargaBonosComponent', () => {
  let component: CargaBonosComponent;
  let fixture: ComponentFixture<CargaBonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargaBonosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaBonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
