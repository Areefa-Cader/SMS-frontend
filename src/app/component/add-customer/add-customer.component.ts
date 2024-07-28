import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit{
   customers:any;
 
  gender : any[]=[
    'Male',
    'Female'
  ]
  

  constructor(private httpClient:HttpClient, private dialogRef:MatDialogRef<AddCustomerComponent>, 
    private router:Router, private toastr:ToastrService){

  }

  saveCustomer = new FormGroup({
    fullname :new FormControl('',Validators.required ),
    email:new FormControl('',Validators.required ),
    contact_no: new FormControl('',Validators.required ),
    gender: new FormControl('',Validators.required ),
    address: new FormControl('',Validators.required )
  })

  ngOnInit(): void {
    this.getCustomer();
    
   
  }
  getCustomer(){
    this.httpClient.get('http://127.0.0.1:8000/api/getCustomer').subscribe((res)=>{
      console.log(res);
    })

  }

  addCustomer(){
    if(this.saveCustomer.valid){
    this.httpClient.post('http://127.0.0.1:8000/api/addCustomer', this.saveCustomer.value).subscribe((res:any)=>{
       console.log(res);
       this.toastr.success(res.message);
       this.dialogRef.close();
       
    })
  }

}
}