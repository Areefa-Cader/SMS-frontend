import { Component, Input, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss']
})
export class SidenavLeftComponent {
  panelOpenState = false;
   sideNavCollapsed = signal(false);
   @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val);
   }

   profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');

   constructor(private router:Router){

   }
}
