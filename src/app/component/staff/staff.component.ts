import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStaffComponent } from '../add-staff/add-staff.component';
import { StaffListComponent } from '../staff-list/staff-list.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
  @ViewChild(StaffListComponent) staffListComponent!: StaffListComponent;

  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

  constructor(private dialog:MatDialog){

  }
 ngOnInit(): void {  
 }

 openAddStaff(){
  const dialogRef = this.dialog.open(AddStaffComponent);

 dialogRef.afterClosed().subscribe(result =>{
   if(result === true){
    this.staffListComponent.getAllStaff();
   }
 })

 }

}
