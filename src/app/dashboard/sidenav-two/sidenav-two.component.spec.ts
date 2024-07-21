import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavTwoComponent } from './sidenav-two.component';

describe('SidenavTwoComponent', () => {
  let component: SidenavTwoComponent;
  let fixture: ComponentFixture<SidenavTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavTwoComponent]
    });
    fixture = TestBed.createComponent(SidenavTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
