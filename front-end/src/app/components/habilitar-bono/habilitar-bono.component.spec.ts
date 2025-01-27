import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarBonoComponent } from './habilitar-bono.component';

describe('HabilitarBonoComponent', () => {
  let component: HabilitarBonoComponent;
  let fixture: ComponentFixture<HabilitarBonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HabilitarBonoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabilitarBonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
