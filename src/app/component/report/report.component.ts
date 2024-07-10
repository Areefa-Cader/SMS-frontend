import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  collapsed = signal(false);
   sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');
}
