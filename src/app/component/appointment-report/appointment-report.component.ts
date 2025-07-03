import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-appointment-report',
  templateUrl: './appointment-report.component.html',
  styleUrls: ['./appointment-report.component.scss']
})
export class AppointmentReportComponent {

  
 

    panelOpenState = false;
     sideNavCollapsed = signal(true);
    
  
     profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');
  
    collapsed = signal(true);
    sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');


}
