import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  service_name: string;
  service_category: string;
  service_amount:string;
  customer_name: string;
  staff_name: string;
  date: string;
}


@Component({
  selector: 'app-service-report-list',
  templateUrl: './service-report-list.component.html',
  styleUrls: ['./service-report-list.component.scss']
})
export class ServiceReportListComponent {

  displayedColumns: string[] = ['id', 'service_name', 'service_category','service_amount','customer_name','staff_name','date'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Hardcode 3 users
    const users: UserData[] = [
      { id: '1', service_name: 'Straightning', service_category: 'Hair Cut', customer_name: 'Alice', staff_name: 'John', date: '2024-07-20',service_amount:'900.00' },
      { id: '2', service_name: 'Straightning', service_category: 'Hair Cut', customer_name: 'Bob', staff_name: 'Jane', date: '2024-07-21',service_amount:'900.00' },
      { id: '3', service_name: 'Straightning', service_category: 'Hair Cut', customer_name: 'Charlie', staff_name: 'Jack', date: '2024-07-22',service_amount:'900.00' }
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
