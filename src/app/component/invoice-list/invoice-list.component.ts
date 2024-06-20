import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit{

  invoice={
    id:'',
    cusName:'',
    issueDate:'',
    totalAmount:'',
    dueDate:''

  };

 

  displayedColumns: any[] = ['id','cusName','issueDate','totalAmount','dueDate','status','action'];
  dataSource!:MatTableDataSource<any>;
  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(){
    
  }

  ngOnInit(): void {
    
  }

 

}
