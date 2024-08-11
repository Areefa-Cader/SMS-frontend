import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getLoggedInUserId():string | null{
    return localStorage.getItem('userId');
  }

  setLoggedInUserId(id : string):void{
    localStorage.setItem('userId', id);
  }
}
