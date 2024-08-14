import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
  providers:[DatePipe]
})
export class AddStaffComponent implements OnInit{
  @Output() staffAdded = new EventEmitter<void>();

  hide= true;
  date : any;

  role : any[]=[
    {value:"Hair Artist", viewValue:"Hair Artist"},
    {value:"Skin Care Artist", viewValue:"Skin Care Artist"},
    {value:"Bridal Dresser", viewValue:"Bridal Dresser"},
    {value:"Manicurist", viewValue:"Manicurist"},
    {value:"All", viewValue:"All"}
  ]

  constructor(private httpClient:HttpClient, private dialogRef:MatDialogRef<AddStaffComponent>,
    private toastr:ToastrService, private datePipe:DatePipe, private router:Router
  ){

  }

  

  submit = new FormGroup({
    
    fullname:new FormControl('',Validators.required ),
    email:new FormControl('',Validators.required ),
    contact_no:new FormControl('',Validators.required ),
    dob:new FormControl('',Validators.required ),
    role:new FormControl([],Validators.required ),
    username:new FormControl('',Validators.required ),
    password:new FormControl('',Validators.required )
})



  ngOnInit(): void {
    this.getAllStaff();
  }


  getAllStaff(){
    this.httpClient.get('http://127.0.0.1:8000/api/getStaff').subscribe((res)=>{
      console.log(res);
    })
  }

  onSubmitData(){
    if(this.submit.valid){

      const formattedDob = this.datePipe.transform(this.submit.get('dob')?.value, 'yyyy-MM-dd');
      const formData = { ...this.submit.value, dob: formattedDob };
      
      this.httpClient.post('http://127.0.0.1:8000/api/addStaff', formData).subscribe((res:any)=>{
        console.log(res);
        if(res.message){
          this.toastr.success('Successfully Added');
          this.getAllStaff();
          this.dialogRef.close();
          
        }else if(res.error){
          this.toastr.error(res.error);
        }
       
      });
    }else{
       this.toastr.warning('Please fill the required fields');
    }
    console.log(this.submit.value);
  }



  closeDialog(){
    this.dialogRef.close();
  }

}
