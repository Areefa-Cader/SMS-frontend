import { Component, OnInit, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');


  constructor(private dialog:MatDialog){

  }
  ngOnInit(): void {
   

  }

  customerForm(){
    this.dialog.open(AddCustomerComponent);
  }

  

}
