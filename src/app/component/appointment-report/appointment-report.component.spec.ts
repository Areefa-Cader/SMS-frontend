import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentReportComponent } from './appointment-report.component';

describe('AppointmentReportComponent', () => {
  let component: AppointmentReportComponent;
  let fixture: ComponentFixture<AppointmentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentReportComponent]
    });
    fixture = TestBed.createComponent(AppointmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
