import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  

  constructor() { }

  

  getRole(): string{
    return localStorage.getItem('userRole') || '';
  }

  isOwner():boolean{
    return this.getRole() === 'owner';
  }
}
