import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewInvoiceComponent } from '../view-invoice/view-invoice.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { BillDetailsComponent } from '../bill-details/bill-details.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


interface Transaction {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit{

  transactionForm = new FormGroup({
    transactionControl: new FormControl('Pending')
  });

  transaction: any[] = [
    {value: 'Pending', viewValue: 'Pending'},
    {value: 'Paid', viewValue: 'Paid'},
  ];
 

  displayedColumns: any[] = ['id','customer_name','service_name','total_amount','issue_date','due_date','status','action'];
  dataSource!:MatTableDataSource<any>;
  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


 

  constructor(private httpClient:HttpClient, private dialog:MatDialog, private router:Router){
    
  }

  ngOnInit(): void {
    this.getAllInvoice();
  }

  getAllInvoice(){
    this.httpClient.get<any[]>('http://127.0.0.1:8000/api/getAllInvoice').subscribe((res)=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
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

  // openInvoice(data:any){
  //   const dialogRef = this.dialog.open(ViewInvoiceComponent,{
  //     data
  // });

   
  // }

  viewInvoice(invoiceId: number){
    console.log(invoiceId);
    
      this.router.navigate(['/bill-details', invoiceId]);
  }

}
