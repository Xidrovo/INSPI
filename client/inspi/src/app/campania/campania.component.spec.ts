import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniaComponent } from './campania.component';

describe('CampaniaComponent', () => {
  let component: CampaniaComponent;
  let fixture: ComponentFixture<CampaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
