import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { UpdateStaffComponent } from '../update-staff/update-staff.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent {

  staff={
    id:'',
    fullname:'',
    email:'',
    contact_no:'',
    role:'',
    dob:''
  };

  
  displayedColumns: any[] = ['id','fullname','email','contact_no','role','dob','action'];
  dataSource!:MatTableDataSource<any>;
  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 

  constructor(private httpClient:HttpClient , private dialog:MatDialog){

  }

  ngOnInit(): void {
    this.getAllStaff();
  }
  getAllStaff(){
    this.httpClient.get('http://127.0.0.1:8000/api/getStaff').subscribe((res)=>{
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
  openConfirmationBox(id:number){
    const dialogRef = this.dialog.open(ConfirmationBoxComponent);

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(result === true){
          console.log(result);
          this.httpClient.delete('http://127.0.0.1:8000/api/deleteStaff/' + id).subscribe((res)=>{
            console.log(res);
            this.getAllStaff();
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

  //update Staff

  updateBox(data : any){
    const dialogRef = this.dialog.open(UpdateStaffComponent, {
      data,
    });
    

     dialogRef.afterClosed().subscribe(() => {
      // Force refresh the data after closing the dialog
      this.getAllStaff();
    });
   
    
  }

  

}