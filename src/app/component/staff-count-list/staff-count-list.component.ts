import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  staff_name: string;
  service_category: string;
  service_count:string;
}


@Component({
  selector: 'app-staff-count-list',
  templateUrl: './staff-count-list.component.html',
  styleUrls: ['./staff-count-list.component.scss']
})
export class StaffCountListComponent {

  displayedColumns: string[] = ['id', 'staff_name', 'service_category','service_count'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Hardcode 3 users
    const users: UserData[] = [
      { id: '1', staff_name: 'Amelia Milar', service_category: 'Skin Care Artist', service_count:'2' },
      { id: '2', staff_name: 'Emilia Ken', service_category: 'Skin Care Artist', service_count:'3' },
      { id: '3', staff_name: 'Maria Rodriguez', service_category: 'Hair Artist', service_count:'2' },
      { id: '4', staff_name: 'Isabella White', service_category: 'Skin Care Artist', service_count:'1' },
      { id: '5', staff_name: 'Evelyn Moore', service_category: 'Bridal Dresser', service_count:'2' },
      { id: '6', staff_name: 'Jessica Marie', service_category: 'Bridal Dresser', service_count:'0' },
      { id: '7', staff_name: 'Riya Khan', service_category: 'Hair Artist', service_count:'0' },
    
     
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
