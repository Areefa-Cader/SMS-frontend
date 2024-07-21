import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  collapsed = signal(true);
   sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

   panelOpenState = false;
   sideNavCollapsed = signal(false);
  //  @Input() set collapsed(val:boolean){
  //   this.sideNavCollapsed.set(val);
  //  }

   profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');
}
