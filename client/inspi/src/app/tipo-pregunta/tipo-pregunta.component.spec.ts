import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPreguntaComponent } from './tipo-pregunta.component';

describe('TipoPreguntaComponent', () => {
  let component: TipoPreguntaComponent;
  let fixture: ComponentFixture<TipoPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
