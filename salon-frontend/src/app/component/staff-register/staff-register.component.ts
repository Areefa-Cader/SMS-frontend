import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.scss']
})
export class StaffRegisterComponent implements OnInit {
   role : any[] =[
    "Hair Artist",
    "Skin Care Artsit",
    "Bridal Dresser"
   ]

  hide=true;

  register = new FormGroup({
    fullname: new FormControl(),
    email: new FormControl(),
    contact_no: new FormControl(),
    dob: new FormControl('', Validators.required),
    role: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),

  });

  constructor(private httpClient:HttpClient){

  }

  ngOnInit(): void {
    
   this.getAllStaff();
  }

  getAllStaff(){
    this.httpClient.get('http://127.0.0.1:8000/api/getStaff').subscribe((res)=>{
      console.log(res);
      
    })
  }


  staffRegister(){
     console.log(this.register.value);
       if(this.register.valid){
      this.httpClient.post('http://127.0.0.1:8000/api/register', this.register.value).subscribe((res)=>{
        console.log(res);
        alert('Sussessfully Saved');
        this.getAllStaff();
      })
  }
}

}
