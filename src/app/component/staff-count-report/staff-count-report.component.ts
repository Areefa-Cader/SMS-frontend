import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-staff-count-report',
  templateUrl: './staff-count-report.component.html',
  styleUrls: ['./staff-count-report.component.scss']
})
export class StaffCountReportComponent {
  panelOpenState = false;
  sideNavCollapsed = signal(false);
 

  profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');

 collapsed = signal(true);
 sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');
}
