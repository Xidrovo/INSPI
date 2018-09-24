import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasHomeComponent } from './plantillas-home.component';

describe('PlantillasHomeComponent', () => {
  let component: PlantillasHomeComponent;
  let fixture: ComponentFixture<PlantillasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
