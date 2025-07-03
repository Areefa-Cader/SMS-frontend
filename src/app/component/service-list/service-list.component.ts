import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateServiceComponent } from '../update-service/update-service.component';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { UtilityService } from 'src/app/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit{

 service={
    id:'',
    service_name:'',
    service_category:'',
    duration:'',
    price:''

  };

  
  displayedColumns: any[] = ['id','service_name','service_category','duration','price','action'];
  dataSource!:MatTableDataSource<any>;
  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

  constructor(private httpClient: HttpClient, private dialog:MatDialog , 
    private utilityService:UtilityService, private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAllService').subscribe((res:any)=>{
      console.log(res);
      
      res.forEach((service: { duration: string; }) => {
        service.duration = this.utilityService.convertTimeToReadableFormat(service.duration);
      });
      
      this.dataSource = new MatTableDataSource(res as any[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    })

  }
  

  updateService(data:any){
    const dialogRef = this.dialog.open(UpdateServiceComponent,{
      data,
    }
    );

         dialogRef.afterClosed().subscribe(() => {
      // Force refresh the data after closing the dialog
      this.getAllServices();
  });

}

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmationBoxComponent);

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(result === true){
          console.log(result);
          this.httpClient.delete('http://127.0.0.1:8000/api/deleteService/' + id).subscribe((res:any)=>{
            console.log(res);
            this.toastr.success(res.message)
            this.getAllServices();
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
  

}
