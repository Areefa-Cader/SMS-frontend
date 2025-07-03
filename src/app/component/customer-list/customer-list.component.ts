import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit{
  getAllStaff() {
    throw new Error('Method not implemented.');
  }
  customer = {
    id : "",
    fullname : "",
    email : "",
    contact_no : "",
    gender : "",
    address:'',
    }

    displayedColumns: any[] = ['id','fullname','email','contact_no','gender','address','action'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


  constructor(private httpClient:HttpClient, private dialog:MatDialog, private toastr:ToastrService){

  }  
  
  
  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer(){
    this.httpClient.get('http://127.0.0.1:8000/api/getCustomer').subscribe((res:any)=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res as any[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    
    })
  }

  update(data:any){
    const dialogRef = this.dialog.open(UpdateCustomerComponent,{
      data
    });

    dialogRef.afterClosed().subscribe(() => {
      // Force refresh the data after closing the dialog
      this.getCustomer();
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmationBoxComponent);

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(result === true){
          console.log(result);
          this.httpClient.delete('http://127.0.0.1:8000/api/deleteCustomer/' + id).subscribe((res:any)=>{
            console.log(res);
            this.toastr.success(res.message);
            this.getCustomer();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
