import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCountListComponent } from './staff-count-list.component';

describe('StaffCountListComponent', () => {
  let component: StaffCountListComponent;
  let fixture: ComponentFixture<StaffCountListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffCountListComponent]
    });
    fixture = TestBed.createComponent(StaffCountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
