import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {CurrencyPipe} from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Transaction {
  service: string;
  cost: number;
}

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit{


id:any='';
cusName:any='';
telNo:any='';
address:any ='';
date:any = '';
serviceName : any='';
serviceAmount:any ='';



constructor(@Inject(MAT_DIALOG_DATA) public data:any, private httpClient:HttpClient){

}

  ngOnInit(): void {

    if(this.data){
      this.id = this.data.id;
      this.cusName = this.data.customer_name;
      this.telNo= this.data.appointment.customer.contact_no;
      this.address = this.data.appointment.customer.address;
      this.date=this.data.issue_date;
   
      };
 
    } 

    
displayedColumns: any[] = ['service', 'cost'];
transactions: Transaction[] = [
  {service: this.data.service_name, cost: this.data.total_amount},
 
];
  
  getTotalCost(){
    
  }
   
  getAllService(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAllService').subscribe((res:any)=>{
      console.log(res);
      
      
    })
  }


}
