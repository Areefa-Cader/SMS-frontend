import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-success-password',
  templateUrl: './success-password.component.html',
  styleUrls: ['./success-password.component.scss']
})
export class SuccessPasswordComponent {

  constructor(private dialogRef:DialogRef){

  }

  closeBox(){
    this.dialogRef.close(ResetPasswordComponent);
  }

}
