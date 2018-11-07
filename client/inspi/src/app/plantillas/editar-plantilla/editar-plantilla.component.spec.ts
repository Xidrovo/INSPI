import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlantillaComponent } from './editar-plantilla.component';

describe('EditarPlantillaComponent', () => {
  let component: EditarPlantillaComponent;
  let fixture: ComponentFixture<EditarPlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
