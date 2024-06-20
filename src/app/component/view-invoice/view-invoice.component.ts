import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent {

  
  invoiceDetails = new FormGroup({
    customer_number : new FormControl(''),
    customer_name: new FormControl(''),
    Invoice_date : new FormControl(''),
    payment_due : new FormControl('')

  });

  invoice = {
    serviceType:'',
    serviceCategory:'',
    dateOfAppointment:'',
    unitPrice:''
  }

  displayedColumns: string[] = ['serviceType','serviceCategory','dateOfAppointment','unitPrice'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
