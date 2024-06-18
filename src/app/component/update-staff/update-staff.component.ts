import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss']
})
export class UpdateStaffComponent implements OnInit{


  role : any[] =[
    "Hair Artist",
    "Skin Care Artsit",
    "Bridal Dresser"
  ]

  update = new FormGroup({
    fullname: new FormControl(),
    email : new FormControl(),
    contact_no: new FormControl(),
    dob:new FormControl(),
    role:new FormControl()
  })

constructor(@Inject(MAT_DIALOG_DATA) public data : any, private httpClient:HttpClient, private dialogRef:DialogRef){
  

}

//get all Staff

getAllStaff(){
  this.httpClient.get('http://127.0.0.1:8000/api/getStaff').subscribe((res)=>{
    console.log(res);
  })
}



  ngOnInit(): void {
    // Convert the received date string to a Date object
  const dobDate = new Date(this.data.dob);
  
  // Patch the Date object into the form control
  this.update.patchValue({
    fullname: this.data.fullname,
    email: this.data.email,
    contact_no: this.data.contact_no,
    dob: dobDate,
    role: this.data.role
  });
  
  this.getAllStaff();
    
  }

  updateStaff(){
    if(this.update.valid){  
        this.httpClient.put('http://127.0.0.1:8000/api/updateStaff/' + this.data.id , this.update.value).
        subscribe((res)=>{
          console.log(this.update.value);
          console.log(res);
          alert('updated successfully');
          this.getAllStaff();
          console.log(this.getAllStaff());
          
          this.dialogRef.close(true);
        })
     
  
  }
      }

      closeUpdate(){
        this.dialogRef.close(true);
      }    
}