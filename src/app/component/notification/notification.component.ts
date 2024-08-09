import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{


 constructor(private httpClient:HttpClient){

 }

  ngOnInit(): void {
   
  }

  sendNotification(){
  //   this.httpClient.get('http://127.0.0.1:8000/api/sendNotifyEmail').subscribe((res:any)=>{
  //     console.log(res);
  //   },(error:any)=>{
  //     console.log(error)
  //   }
  // )
  }

}
