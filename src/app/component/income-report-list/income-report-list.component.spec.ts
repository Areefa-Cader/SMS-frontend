import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeReportListComponent } from './income-report-list.component';

describe('IncomeReportListComponent', () => {
  let component: IncomeReportListComponent;
  let fixture: ComponentFixture<IncomeReportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeReportListComponent]
    });
    fixture = TestBed.createComponent(IncomeReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
