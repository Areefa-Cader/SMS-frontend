import { Component, OnInit, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit{
  

  collapsed = signal(true);
  sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

  constructor(private dialog:MatDialog){

  }

  ngOnInit(): void {
    
  }

  addInvoiceForm(){
    this.dialog.open(AddInvoiceComponent);
  }
}
