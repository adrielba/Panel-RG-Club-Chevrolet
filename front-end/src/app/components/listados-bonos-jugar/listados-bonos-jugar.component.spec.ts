import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosBonosJugarComponent } from './listados-bonos-jugar.component';

describe('ListadosBonosJugarComponent', () => {
  let component: ListadosBonosJugarComponent;
  let fixture: ComponentFixture<ListadosBonosJugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadosBonosJugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadosBonosJugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
