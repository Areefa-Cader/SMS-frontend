import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {NativeDateAdapter} from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss'],

})
export class StaffDashboardComponent implements OnInit{
 
  selected: Date | null = null;
  startDate1: Date;
  startDate2: Date;

  constructor(private dateAdapter: DateAdapter<Date>) {
    const today = new Date();
    this.startDate1 = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate2 = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  timeSlots = [
    { time: '11:00 AM', staff: { name: 'Jayden Barnes', specialization: 'Cosmetology', image: 'assets/jayden.jpg' }, reschedulable: true },
    { time: '12:00 PM', staff: { name: 'Vijaya Prabakaran Manchester', specialization: 'Osteopathy', image: 'assets/vijaya.jpg' }, reschedulable: true },
    // Add more slots here
  ];


ngOnInit(): void {
  
}

}


