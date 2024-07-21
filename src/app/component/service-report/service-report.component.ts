import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss']
})
export class ServiceReportComponent {
  panelOpenState = false;
   sideNavCollapsed = signal(false);
  

   profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');

  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');
}
