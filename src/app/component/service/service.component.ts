import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../add-service/add-service.component';
import { ServiceListComponent } from '../service-list/service-list.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit{
    @ViewChild(ServiceListComponent) serviceListComponent!: ServiceListComponent;

  
  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');
  services :any[]=[];

  constructor(private httpClient:HttpClient, private dialog:MatDialog){

  }

  ngOnInit(): void {
    this.getAllservices();
  }

  getAllservices(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAllService').subscribe((res:any)=>{
      console.log(res);
      this.services = res;
      
    })
  }



  openAddService(){
    const dialogRef = this.dialog.open(AddServiceComponent);

   
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
       this.serviceListComponent.getAllServices();
      }
    });
  }
}
