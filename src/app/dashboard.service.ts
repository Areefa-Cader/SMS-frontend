import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }

  getTotalAppointment():Observable<any>{
  
   return this.httpClient.get('http://127.0.0.1:8000/api/getAllAppointment');
  
  }

  getTotalCustomer():Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8000/api/getCustomer');
  }

  getTotalStaff():Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8000/api/getStaff');
  }

  getTotalService():Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8000/api/getAllService')
  }

  getUpcomingAppointment():Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8000/api/getUpcomingAppointment');
  }

  getStaffAvailability():Observable<any>{
    return this.httpClient.get('http://127.0.0.1:8000/api/getStaffAvailability');
  }
}
