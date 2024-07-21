import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReportListComponent } from './service-report-list.component';

describe('ServiceReportListComponent', () => {
  let component: ServiceReportListComponent;
  let fixture: ComponentFixture<ServiceReportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceReportListComponent]
    });
    fixture = TestBed.createComponent(ServiceReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
