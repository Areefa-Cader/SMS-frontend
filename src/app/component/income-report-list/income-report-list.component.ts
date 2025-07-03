import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {CurrencyPipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-report-list',
  templateUrl: './income-report-list.component.html',
  styleUrls: ['./income-report-list.component.scss'],
})
export class IncomeReportListComponent implements OnInit{


   fromDate: Date | null = null;
    toDate: Date | null = null;
  
    data={
      appointment_id:'',
      invoice_id :'',
      date:'',
      amount:''
  
    };
  
    
    displayedColumns: any[] = ['appointment_id','invoice_id','date','amount'];
    dataSource!:MatTableDataSource<any>;
    
  
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
   
  
    constructor(private httpClient:HttpClient, private dialog:MatDialog,private toastr:ToastrService){
  
    }
  
    ngOnInit(): void {
      this.getAllInvoiceList();
    }
  
  
    getAllInvoiceList(){
      this.httpClient.get('http://127.0.0.1:8000/api/getAllIncome').subscribe((res)=>{
        console.log(res);
  
        this.dataSource = new MatTableDataSource(res as any[]);

        setTimeout(()=>{
          this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
        });

        this.fromDate = null;
        this.toDate = null;
        
      })

    }



    getTotalCost(): number{

      if(!this.dataSource || !this.dataSource.data){
        return 0;
      }
      return this.dataSource.data
      .map(item=> +item.amount)
      .reduce((acc,value)=> acc + value , 0)
    }
  
    filterByDate(){
      if(!this.fromDate || !this.toDate){
        this.toastr.warning("Please select both From and To dates");
        return;
      }
  
  
      const formattedFrom = this.fromDate.toISOString().split('T')[0];
      const formattedTo = this.toDate.toISOString().split('T')[0];
  
      console.log(formattedFrom);
      console.log(formattedTo);
  
      const body ={
           from : formattedFrom,
           to: formattedTo
      }
      
      
  
      this.httpClient.post('http://127.0.0.1:8000/api/incomeFilter' , body).subscribe((res)=>{
         console.log(res);
         this.dataSource = new MatTableDataSource(res as any[]);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         
      },
      (error)=>{
        this.toastr.warning("Error on filtered appointments");
        console.error(error);
      }
    );
    }
  

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  

}
