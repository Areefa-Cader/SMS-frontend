import { Component, EventEmitter, OnInit, Output, computed, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  collapsed = signal(false);
   sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');
 
  
  ngOnInit(): void {  
  }
 
}
