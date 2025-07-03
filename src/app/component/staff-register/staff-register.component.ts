import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.scss'],
  providers:[DatePipe]
})
export class StaffRegisterComponent implements OnInit {
  selectedRole : any ='';
   role : any[] =[
    "Hair Artist",
    "Skin Care Artsit",
    "Bridal Dresser",
    "Manicurist",
    "All"
   ]

  hide=true;
  
  fullname:any = '';
  email:any= '';
  contact_no:any='';
  dob:any='';
  username:any='';
  password:any='';
  dobInvalid:boolean = false;


  constructor(private httpClient:HttpClient, private toastr:ToastrService, 
    private router:Router, private datePipe:DatePipe){

  }

  ngOnInit(): void {
    
   this.getAllStaff();
  }

  getAllStaff(){
    this.httpClient.get('http://127.0.0.1:8000/api/getStaff').subscribe((res)=>{
      console.log(res);
      
    })
  }

  validate(){

    if(this.dob){
      const selectedYear = new Date (this.dob).getFullYear();
      this.dobInvalid = selectedYear > 2005;
      return !this.dobInvalid;
    }

    this.dobInvalid = true;
    return false;

  }


  staffRegister(){

    if(!this.validate()){
      this.toastr.error("Date of the Birth must be before 2006");
      return;
    }


    let staff ={
      'fullname':this.fullname,
      'email':this.email,
      'contact_no':this.contact_no,
      'dob':this.datePipe.transform(this.dob, 'yyyy-MM-dd'),
      'role':this.selectedRole,
      'username':this.username,
      'password':this.password
    }

    console.log(staff.role);
    

     console.log(staff);
       if(staff){
      this.httpClient.post('http://127.0.0.1:8000/api/register', staff).subscribe((res:any)=>{
        console.log(res);
        if(res.message){
          this.getAllStaff();
          this.toastr.success(res.message);
          
          this.router.navigate(['/']);
        }else if(res.error){
          this.toastr.error(res.error);
        }
        
        
        // this.fullname = '';
        // this.email = '';
        // this.contact_no = '';
        // this.dob ='';
        // this.selectedRole = '';
        // this.username = '';
        // this.password = '';
      })
  }
}

}
