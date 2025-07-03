import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-appointment-report-list',
  templateUrl: './appointment-report-list.component.html',
  styleUrls: ['./appointment-report-list.component.scss']
})

export class AppointmentReportListComponent implements OnInit {

  fromDate! : Date;
  toDate! : Date;

  data={
    id:'',
    customer_name :'',
    staff_name : '',
    service_name:'',
    service_price:'',
    date:''

  };

  
  displayedColumns: any[] = ['id', 'customer_name','staff_name','service_name','service_price','date'];
  dataSource!:MatTableDataSource<any>;
  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 

  constructor(private httpClient:HttpClient, private dialog:MatDialog,private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.getAllAppointment();
    this.getAllAppointmentReportList();
  }


  getAllAppointmentReportList(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAllAppointmentReport').subscribe((res)=>{
      console.log(res);

      this.dataSource = new MatTableDataSource(res as any[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    })
  }

  filterByDate(){
    if(!this.fromDate || !this.toDate){
      this.toastr.warning("Please select both From and To dates");
      return;
    }


    const formattedFrom = this.fromDate.toISOString().split('T')[0];
    const formattedTo = this.toDate.toISOString().split('T')[0];

    console.log(formattedFrom);
    console.log(formattedTo);

    const body ={
         from : formattedFrom,
         to: formattedTo
    }
    
    

    this.httpClient.post('http://127.0.0.1:8000/api/filterAppointmentsByDate' , body).subscribe((res)=>{
       console.log(res);
       this.dataSource = new MatTableDataSource(res as any[]);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
       
    },
    (error)=>{
      this.toastr.warning("Error on filtered appointments");
      console.error(error);
    }
  );
  }

   getAllAppointment(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAllAppointment').subscribe((res)=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res as any[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
