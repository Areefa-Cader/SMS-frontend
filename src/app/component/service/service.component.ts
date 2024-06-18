import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../add-service/add-service.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit{
  
  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

  constructor(private httpClient:HttpClient, private dialog:MatDialog){

  }

  ngOnInit(): void {
  }

  openAddService(){
    this.dialog.open(AddServiceComponent);
  }
}
