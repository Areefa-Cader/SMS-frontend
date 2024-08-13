import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Transaction {
  service: string;
  cost: number;
}


@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit{

  invoiceId : any;
  customer_name :any ='';
  due_date :any ='';
  service_name:any ='';
  total_amount:any ='';
  advance_payment:any ='';


  constructor(private httpClient:HttpClient, private toastr:ToastrService, private route:ActivatedRoute){

  }

  ngOnInit(): void {

    this.invoiceId = this.route.snapshot.paramMap.get('id');
    console.log(this.invoiceId);

    this.getAllInvoiceDetails(this.invoiceId);
    
    
  }

  displayedColumns: any[] = ['service', 'cost'];
transactions: Transaction[] = [
 
];


getAllInvoiceDetails(id:any){
  this.httpClient.get('http://127.0.0.1:8000/api/getInvoiceById/' + this.invoiceId).subscribe((res:any)=>{
    console.log(res);
    this.customer_name = res.invoice.customer_name;
    this.due_date = res.invoice.due_date;
    this.service_name = res.invoice.service_name;
    this.total_amount = res.invoice.total_amount;
    this.advance_payment = res.invoice.advanced_payment;
   
    
  })
  
}
  

}
