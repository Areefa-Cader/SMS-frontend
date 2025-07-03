import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentReportListComponent } from './appointment-report-list.component';

describe('AppointmentReportListComponent', () => {
  let component: AppointmentReportListComponent;
  let fixture: ComponentFixture<AppointmentReportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentReportListComponent]
    });
    fixture = TestBed.createComponent(AppointmentReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
