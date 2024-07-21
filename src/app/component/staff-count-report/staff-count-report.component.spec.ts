import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCountReportComponent } from './staff-count-report.component';

describe('StaffCountReportComponent', () => {
  let component: StaffCountReportComponent;
  let fixture: ComponentFixture<StaffCountReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffCountReportComponent]
    });
    fixture = TestBed.createComponent(StaffCountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
