import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPasswordComponent } from '../success-password/success-password.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  
  hide = true;
  password:any='';
  confirm_password: any ='';

  constructor(private dialog:MatDialog){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  success(){
    this.dialog.open(SuccessPasswordComponent);
  }
}
