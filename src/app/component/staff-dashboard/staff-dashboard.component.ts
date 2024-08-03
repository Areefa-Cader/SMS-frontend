import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit , ViewEncapsulation} from '@angular/core';
import {NativeDateAdapter} from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { filter } from 'rxjs';


@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class StaffDashboardComponent implements OnInit{

  startDate1: Date;
  startDate2: Date;
  appointmentDates :string[] = [];
  appointmentsLoaded = false;
 
  
  constructor(private dateAdapter: DateAdapter<Date>,
    private httpClient: HttpClient,
    private datePipe: DatePipe, private cdRef: ChangeDetectorRef,)

      {
    const today = new Date();
   
    this.startDate1 = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate2 = new Date(today.getFullYear(), today.getMonth() +1, 1);
  
  }

  // timeSlots = [
  //   { time: '11:00 AM', staff: { name: 'Jayden Barnes', specialization: 'Cosmetology', image: 'assets/jayden.jpg' }, reschedulable: true },
  //   { time: '12:00 PM', staff: { name: 'Vijaya Prabakaran Manchester', specialization: 'Osteopathy', image: 'assets/vijaya.jpg' }, reschedulable: true },
  //   // Add more slots here
  // ];

   
  allTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
   '14:00', '15:00', '16:00', '17:00', '18:00'
];


ngOnInit(): void {
  this.getAllAppointment();
 
  
}

getAllAppointment(){
  this.httpClient.get('http://127.0.0.1:8000/api/getAllAppointment').subscribe((res:any)=>{
    this.appointmentDates = res.map((appointment: any) => {
        return this.datePipe.transform(new Date(appointment.date), 'yyyy-MM-dd');
      });
      this.appointmentsLoaded = true;
      console.log('Appointment Dates:', this.appointmentDates);
      this.cdRef.detectChanges(); 
    });
    
   
}

dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  
  if (view === 'month') {
    const fullDate = this.datePipe.transform(cellDate, 'yyyy-MM-dd');
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    // const isHighlighted = this.appointmentDates.some(appointment => appointment === fullDate);
    // console.log(fullDate, isHighlighted);

    if (this.appointmentDates.includes(fullDate!)) {
      if (fullDate! === today!) {
        return 'example-today-date-class';
      } else {
        return 'example-custom-date-class';
      }
    }
    
    // return isHighlighted ? 'example-custom-date-class' : '';
  }
  return '';
};
}
 
    



