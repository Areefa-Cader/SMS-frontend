import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit{
  @Output() serviceAdded = new EventEmitter<void>();

  services : any[] =[];

  storeService = new FormGroup({
    service_name:new FormControl('',Validators.required ),
    service_category: new FormControl('',Validators.required ),
    duration : new FormControl('',Validators.required ),
    price : new FormControl('',Validators.required )
});

  constructor(private httpClient: HttpClient, private router:Router, 
    private dialogRef:DialogRef, private toastr: ToastrService){

  }


  ngOnInit(): void {
    this.getAllservices();
    console.log(this.storeService.value);
    
  }

  getAllservices(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAllService').subscribe((res:any)=>{
      console.log(res);
      this.services = res;
      
    })
  }
  addService(){
    this.httpClient.post('http://127.0.0.1:8000/api/addService',this.storeService.value).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.message){
          this.dialogRef.close(AddServiceComponent);
          this.router.navigate(['/service']);
          this.getAllservices();
          this.toastr.success(res.message);
          
          

        }else{
          this.toastr.error(res.error);
        }
      }
    )
  }

  dialogBoxClose(){
    this.dialogRef.close(AddServiceComponent);

  }


}
