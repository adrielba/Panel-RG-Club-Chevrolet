import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonoNoParticipaComponent } from './bono-no-participa.component';

describe('BonoNoParticipaComponent', () => {
  let component: BonoNoParticipaComponent;
  let fixture: ComponentFixture<BonoNoParticipaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonoNoParticipaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonoNoParticipaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
