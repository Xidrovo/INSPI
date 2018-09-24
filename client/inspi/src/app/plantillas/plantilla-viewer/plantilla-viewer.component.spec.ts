import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaViewerComponent } from './plantilla-viewer.component';

describe('PlantillaViewerComponent', () => {
  let component: PlantillaViewerComponent;
  let fixture: ComponentFixture<PlantillaViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
