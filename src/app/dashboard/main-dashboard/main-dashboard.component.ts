import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, ViewChild, computed, signal } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit{
  collapsed = signal(false);
   sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');
 
  
  ngOnInit(): void {  
  }
 
  }

