import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableBasicComponent } from './datatable-basic.component';

describe('DatatableBasicComponent', () => {
  let component: DatatableBasicComponent;
  let fixture: ComponentFixture<DatatableBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
