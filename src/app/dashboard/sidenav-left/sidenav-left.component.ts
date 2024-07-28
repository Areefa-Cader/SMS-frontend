import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from 'src/app/user-role.service';

@Component({
  selector: 'app-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss']
})
export class SidenavLeftComponent implements OnInit {
  panelOpenState = false;
   sideNavCollapsed = signal(false);
   @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val);
   }

   profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');

   constructor(private router:Router, private userRoleService:UserRoleService){

   }
  ngOnInit(): void {
    
  }

  isOwner():boolean{
    return this.userRoleService.isOwner();
  }
}
