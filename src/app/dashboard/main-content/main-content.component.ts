import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  providers:[DatePipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent implements OnInit{

 totalAppointment :number | null = null;
 totalCustomer :number | null = null;
 totalStaff :number | null = null;
 totalService :number | null = null;
 upcomingAppointment:any[]=[];
 staffAvailability:any[]=[];
 startDate1 : Date | null ;
 selectedAppointments:any[]=[];
 appointmentDetails:any[]=[];
 appointmentDates :string[] = [];
 appointmentsLoaded = false;
 appointmentTime:any;


 appointment={
    id : '',
    cusName:'',
    empName:'',
    service:'',
    date:'',
    time:''
 }

 displayedColumns: any[] = ['id','cusName','empName','service','date','time'];
  dataSource!:MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 constructor(private httpClient:HttpClient, private dashboardService:DashboardService,
  private dateAdapter: DateAdapter<Date>, private cdRef:ChangeDetectorRef, private datePipe:DatePipe
 ){

  const today = new Date();
   
  this.startDate1 = new Date(today.getFullYear(), today.getMonth(), 1);

 }


  ngOnInit(): void {
     this.loadDashboardData();
     this.getAllAppointment();


  }
    
    loadDashboardData(){
    this.dashboardService.getTotalAppointment().subscribe((res:any)=>{
      this.totalAppointment = res.length;
      console.log(this.totalAppointment);
      
    });

    this.dashboardService.getTotalCustomer().subscribe((res:any)=>{
      this.totalCustomer = res.length;
      console.log(this.totalCustomer);
      
    });

    this.dashboardService.getTotalService().subscribe((res:any)=>{
      this.totalService = res.length;
      console.log(this.totalService);
      
    });

    this.dashboardService.getTotalStaff().subscribe((res:any)=>{
      this.totalStaff = res.length;
      console.log(this.totalStaff);
      
    })

    this.dashboardService.getUpcomingAppointment().subscribe((res:any)=>{
      this.upcomingAppointment = res;
      this.dataSource = new MatTableDataSource(this.upcomingAppointment);
      this.dataSource.paginator = this.paginator;
      console.log(this.upcomingAppointment);
      
    });

    this.dashboardService.getStaffAvailability().subscribe((res:any)=>{
      this.staffAvailability = res;
      console.log(this.staffAvailability);
      
    })

  }

  getAllAppointment(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAllAppointment').subscribe((res:any)=>{
      this.appointmentDetails = res.map((appointment: any) => ({
          date: this.datePipe.transform(new Date(appointment.date), 'yyyy-MM-dd'),
          time: appointment.time,
          staff : appointment.empName,
          service : appointment.service,
          customer : appointment.cusName,
        }));
        this.appointmentDates = this.appointmentDetails.map(appointment => appointment.date);
        this.appointmentsLoaded = true;
        console.log('Appointment Dates:', this.appointmentDates);
        this.appointmentTime = this.appointmentDetails.map(appointment =>appointment.time);
        console.log('Appointment time:', this.appointmentTime);
        this.cdRef.detectChanges();  

  })}
  
  //Appointments dates on calander

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
   
    if (view === 'month') {
      
      const fullDate = this.datePipe.transform(cellDate, 'yyyy-MM-dd');
      const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  
      const isHighlighted = this.appointmentDates.some(appointment => appointment === fullDate);
      // console.log(fullDate, isHighlighted);
      // console.log(this.appointmentDates);
      // console.log(fullDate);

      // if (this.appointmentDates.includes(fullDate!)) {
      //   if (fullDate! === today!) {
      //     return 'example-today-date-class';
      //   } else {
      //     return 'example-custom-date-class';
      //   }
      // }
      
      return isHighlighted ? 'example-custom-date-class' : (fullDate === today ? 
        'example-today-date-class' : '');

    }
    return '';
  };
  
  
  
  onSelectDate(date : Date | null): void{
     const selectedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
     console.log(selectedDate);
     
     this.selectedAppointments = this.appointmentDetails.filter(appointment => appointment.date === selectedDate);
     console.log(this.selectedAppointments); // filter the booked dates from selected dates

     const appointmentTime = this.selectedAppointments.map(appointment=> appointment.time);
     console.log(appointmentTime);
     
  
    //  if(this.selectedAppointments.length === 0){
    //   this.selectedAppointments = [{noAppointments: true}];
    // }

    this.cdRef.detectChanges();  

}


}
