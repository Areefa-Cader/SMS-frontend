import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAvailablitiyComponent } from './staff-availablitiy.component';

describe('StaffAvailablitiyComponent', () => {
  let component: StaffAvailablitiyComponent;
  let fixture: ComponentFixture<StaffAvailablitiyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAvailablitiyComponent]
    });
    fixture = TestBed.createComponent(StaffAvailablitiyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
