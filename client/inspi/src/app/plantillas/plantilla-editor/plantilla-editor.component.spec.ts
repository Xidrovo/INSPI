import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaEditorComponent } from './plantilla-editor.component';

describe('PlantillaEditorComponent', () => {
  let component: PlantillaEditorComponent;
  let fixture: ComponentFixture<PlantillaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
