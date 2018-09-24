import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSeccionComponent } from './agregar-seccion.component';

describe('AgregarSeccionComponent', () => {
  let component: AgregarSeccionComponent;
  let fixture: ComponentFixture<AgregarSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
