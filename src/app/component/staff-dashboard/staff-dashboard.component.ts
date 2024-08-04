import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit , ViewEncapsulation} from '@angular/core';
import {NativeDateAdapter} from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { filter } from 'rxjs';
import { UserRoleService } from 'src/app/user-role.service';


@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class StaffDashboardComponent implements OnInit{


  today: any;
  currentTime: any;
  username: any;
  startDate1: Date | null;
  startDate2: Date | null;
  appointmentDates :string[] = [];
  appointmentsLoaded = false;
  appointmentDetails : any[] =[];
  selectedAppointments: any[]=[];
 
  
  constructor(private dateAdapter: DateAdapter<Date>,
    private httpClient: HttpClient,
    private datePipe: DatePipe, private cdRef: ChangeDetectorRef,
    private userRoleService: UserRoleService
  )

      {
    const today = new Date();
   
    this.startDate1 = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate2 = new Date(today.getFullYear(), today.getMonth() +1, 1);
  
  }

   
  allTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
   '14:00', '15:00', '16:00', '17:00', '18:00'
];


ngOnInit(): void {
  this.getAllAppointment();
  this.username = localStorage.getItem('username') || null;

  this.today = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
  this.currentTime = this.datePipe.transform(new Date(), 'HH:mm a');
  
}


// storing the dates
getAllAppointment(){
  this.httpClient.get('http://127.0.0.1:8000/api/getAllAppointment').subscribe((res:any)=>{
    this.appointmentDetails = res.map((appointment: any) => ({
        date: this.datePipe.transform(new Date(appointment.date), 'yyyy-MM-dd'),
        time: appointment.time,
        staff : appointment.empName,
        service : appointment.service,
        customer : appointment.cusName,
      }));
      this.appointmentDetails.sort((a, b) => a.time.localeCompare(b.time)); // sort the time
      console.log(this.appointmentDetails);
      
      this.appointmentDates = this.appointmentDetails.map(appointment => appointment.date);
      this.appointmentsLoaded = true;
      console.log('Appointment Dates:', this.appointmentDates);
      this.cdRef.detectChanges(); 

      this.showTodaysAppointments();
    });  
   
}

// highlights the date

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



onSelectDate(date : Date | null): void{
   const selectedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
   console.log(selectedDate);
   
   this.selectedAppointments = this.appointmentDetails.filter(appointment => appointment.date === selectedDate);
   console.log(this.selectedAppointments); // filter the booked dates from selected dates
   
   this.cdRef.detectChanges();
}
showTodaysAppointments(): void {
  const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  console.log(today);
  
  this.selectedAppointments = this.appointmentDetails.filter(appointment => appointment.date === today);
  console.log(this.selectedAppointments);
  
  this.cdRef.detectChanges();
}
}
 
    



