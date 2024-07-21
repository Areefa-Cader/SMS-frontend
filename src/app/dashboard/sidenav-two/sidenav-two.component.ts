import { Component, computed, Input, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-two',
  templateUrl: './sidenav-two.component.html',
  styleUrls: ['./sidenav-two.component.scss']
})
export class SidenavTwoComponent {

  panelOpenState = false;
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean){
   this.sideNavCollapsed.set(val);
  }

  profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');

  constructor(private router:Router){

  }

}
