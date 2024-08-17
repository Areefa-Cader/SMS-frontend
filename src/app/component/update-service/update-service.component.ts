import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit{
  @Output() serviceUpdated = new EventEmitter<void>();
  
  service = new FormGroup({
    service_name: new FormControl(),
    service_category : new FormControl(),
    duration : new FormControl(),
    price : new FormControl()
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data : any, private httpClient:HttpClient, 
  private dialog:MatDialog, private dialogRef:DialogRef, private toastr:ToastrService, private router:Router){

  }

  ngOnInit(): void {
    this.service.patchValue({
    service_name: this.data.service_name,
    service_category: this.data.service_category,
    duration : this.data.duration,
    price : this.data.price
  });

  // this.getServices();
  }

  getServices(){
    this.httpClient.get('http://127.0.0.1:8000/api/getService').subscribe((res:any)=>{
      console.log(res);
      
    });
  }

  updateService(){
    this.httpClient.put('http://127.0.0.1:8000/api/updateService/' + this.data.id, this.service.value)
    .subscribe((res:any)=>{
      console.log(res);
      if(res.message){
        this.toastr.success(res.message);
        this.dialogRef.close(true);
        this.router.navigate(['/service']);
      }else{
        this.toastr.error('error while updating');
      }
     
    })
    
  }

  closeUpdateBox(){
    this.dialogRef.close(UpdateServiceComponent);
    // this.serviceUpdated.emit(); 
  }

}
