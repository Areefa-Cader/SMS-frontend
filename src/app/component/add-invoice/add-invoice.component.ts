import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent {
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
