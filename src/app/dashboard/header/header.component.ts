import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, computed, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  collapsed = signal(false);
   sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

   notifications:any[]=[];
   unreadCount : number = 0;

   constructor(private httpClient:HttpClient){

   }
 
  
  ngOnInit(): void {  
  }

  loadNotifications(){
    this.httpClient.get('http://127.0.0.1:8000/api/getNotifications').subscribe((res:any)=>{
      console.log(res);

      this.notifications = res;
      this.unreadCount = this.notifications.length;
      
    })
  }
 
}
