import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VialesComponent } from './viales.component';

describe('VialesComponent', () => {
  let component: VialesComponent;
  let fixture: ComponentFixture<VialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
