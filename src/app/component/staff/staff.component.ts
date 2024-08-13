import { Component, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStaffComponent } from '../add-staff/add-staff.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {

  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

  constructor(private dialog:MatDialog){

  }
 ngOnInit(): void {  
 }

 openAddStaff(){
  this.dialog.open(AddStaffComponent);

 

 }

}
