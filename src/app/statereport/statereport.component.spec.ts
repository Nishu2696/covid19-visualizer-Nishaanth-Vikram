import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatereportComponent } from './statereport.component';

describe('StatereportComponent', () => {
  let component: StatereportComponent;
  let fixture: ComponentFixture<StatereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
