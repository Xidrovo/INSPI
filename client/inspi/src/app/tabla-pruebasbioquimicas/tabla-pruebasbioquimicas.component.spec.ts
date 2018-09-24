import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPruebasbioquimicasComponent } from './tabla-pruebasbioquimicas.component';

describe('TablaPruebasbioquimicasComponent', () => {
  let component: TablaPruebasbioquimicasComponent;
  let fixture: ComponentFixture<TablaPruebasbioquimicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPruebasbioquimicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPruebasbioquimicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
