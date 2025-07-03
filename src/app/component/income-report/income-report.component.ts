import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.scss']
})
export class IncomeReportComponent {

     panelOpenState = false;
       sideNavCollapsed = signal(true);
      
    
       profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');
    
      collapsed = signal(true);
      sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');
  
  

}
