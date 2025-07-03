import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { CustomerListComponent } from '../customer-list/customer-list.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  @ViewChild(CustomerListComponent) customerListComponent!: CustomerListComponent;

  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');


  constructor(private dialog:MatDialog, private route:Router){

  }
  ngOnInit(): void {
   

  }

  customerForm(){
    const dialogRef = this.dialog.open(AddCustomerComponent);

    dialogRef.afterClosed().subscribe((result)=>{
      if (result === true){
        this.customerListComponent.getCustomer();
      }
    })
  }

  

  

}
