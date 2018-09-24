import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRamComponent } from './tabla-ram.component';

describe('TablaRamComponent', () => {
  let component: TablaRamComponent;
  let fixture: ComponentFixture<TablaRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
