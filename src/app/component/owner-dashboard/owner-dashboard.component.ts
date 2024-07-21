import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss']
})
export class OwnerDashboardComponent {

  collapsed = signal(false);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

}
