import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPasswordComponent } from './success-password.component';

describe('SuccessPasswordComponent', () => {
  let component: SuccessPasswordComponent;
  let fixture: ComponentFixture<SuccessPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessPasswordComponent]
    });
    fixture = TestBed.createComponent(SuccessPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
