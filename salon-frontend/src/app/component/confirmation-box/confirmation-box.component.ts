import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit{

  constructor(private dialogRef:MatDialogRef<ConfirmationBoxComponent>){

  }
  ngOnInit(): void {
    
  }


  onYes(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(false)
  }

}
