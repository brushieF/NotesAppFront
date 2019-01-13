import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorShowerComponent } from './error-shower.component';

describe('ErrorShowerComponent', () => {
  let component: ErrorShowerComponent;
  let fixture: ComponentFixture<ErrorShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
