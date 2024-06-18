import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit{

 totalAppointment :number | null = null;
 totalCustomer :number | null = null;
 totalStaff :number | null = null;
 totalService :number | null = null;
 upcomingAppointment:any[]=[];
 staffAvailability:any[]=[];

 
  selected!: Date | null;


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

 constructor(private httpClient:HttpClient, private dashboardService:DashboardService){

 }


  ngOnInit(): void {

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

}
