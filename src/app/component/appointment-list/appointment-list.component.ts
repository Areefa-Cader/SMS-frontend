import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { UpdateAppointmentComponent } from '../update-appointment/update-appointment.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit{
  data={
    id:'',
    cusName :'',
    empName : '',
    date:'',
    time:'',
    service:''

  };

  
  displayedColumns: any[] = ['id', 'cusName','empName','date','time','service','action'];
  dataSource!:MatTableDataSource<any>;
  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 

  constructor(private httpClient:HttpClient, private dialog:MatDialog,private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.getAllAppointment();
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

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmationBoxComponent);

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(result === true){
          console.log(result);
          this.httpClient.delete('http://127.0.0.1:8000/api/deleteAppointment/' + id).subscribe((res:any)=>{
            console.log(res);
            this.toastr.success(res.message);
            this.getAllAppointment();
          },
          (error)=>{
            console.log(error);
          }
          )
        }else{
          dialogRef.close();
        }
      }
    })
    
  }

  //update Appointment

  updateAppointment(data:any){
    const dialogRef = this.dialog.open(UpdateAppointmentComponent,{
      data,
    });
  }
  


}
