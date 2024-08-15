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

  advance_payment: number = 100; // Example initial value
  isEditing: boolean = false;
  newAdvancePayment: any;

  invoiceId : any;
  customer_name :any ='';
  due_date :any ='';
  service_name:any ='';
  total_amount:any ='';
  // advance_payment:any ='';
  issue_date:any='';


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
    this.issue_date = res.invoice.issue_date


    this.transactions = [
      {
        service: this.service_name,
        cost:this.total_amount
      }
    ]
   
    
  })


  }

  getTotalCost(){
    return this.transactions.reduce((acc, transaction) => acc + transaction.cost, '');
  }


  startEdit(): void {
    this.isEditing = true;
    this.newAdvancePayment = this.advance_payment;
  }

  // Method to save the updated amount
  saveEdit(): void {
    if (this.newAdvancePayment !== undefined) {
      this.advance_payment = this.newAdvancePayment;
      // Optionally make an API call here to save the new value to the backend
    }
    this.isEditing = false;
  }

  // Method to cancel the edit
  cancelEdit(): void {
    this.isEditing = false;
  }
}
  

  



