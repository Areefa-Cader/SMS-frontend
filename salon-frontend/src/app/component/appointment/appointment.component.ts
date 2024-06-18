import { Component, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  
})
export class AppointmentComponent {
  collapsed = signal(true);
   sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

  constructor(private dialog:MatDialog, private router:Router){

  }
  openAddAppointment(){
    // this.dialog.open(AddAppointmentComponent);
    this.router.navigate(['/add-appointment']);
  }


}
