import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit{

   
  gender : any[]=[
    'Male',
    'Female'
  ]

  update = new FormGroup({
    fullname:new FormControl(),
    email:new FormControl(),
    contact_no:new FormControl(),
    gender:new FormControl(),
    address:new FormControl(),

  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private httpClient:HttpClient,
  private dialog:MatDialog, private dialogRef:DialogRef
  ){

  }



  ngOnInit(): void {
    const dobDate = new Date(this.data.dob);
  
  // Patch the Date object into the form control
  this.update.patchValue({
    fullname: this.data.fullname,
    email: this.data.email,
    contact_no: this.data.contact_no,
    gender: this.data.gender,
    address: this.data.address,
  });
  
   this.getCustomer();
  }

  getCustomer(){
    this.httpClient.get('http://127.0.0.1:8000/api/getCustomer').subscribe((res)=>{
      console.log(res);
      
    })
  }

  updateCustomer(){
    if(this.update.valid){
      this.httpClient.put('http://127.0.0.1:8000/api/updateCustomer/' + this.data.id , this.update.value).subscribe(
        (res)=>{
          console.log(res);
          this.dialogRef.close(UpdateCustomerComponent);
          this.getCustomer();
          alert('updated successfully');

          

        }
      )
    }
  }

  closeUpdateBox(){
    this.dialogRef.close(UpdateCustomerComponent);
  }

}
