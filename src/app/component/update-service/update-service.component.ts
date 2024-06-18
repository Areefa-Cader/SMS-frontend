import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit{
  
  service = new FormGroup({
    service_name: new FormControl(),
    service_category : new FormControl(),
    duration : new FormControl(),
    price : new FormControl()
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data : any, private httpClient:HttpClient, 
  private dialog:MatDialog, private dialogRef:DialogRef){

  }

  ngOnInit(): void {
    this.service.patchValue({
    service_name: this.data.service_name,
    service_category: this.data.service_category,
    duration : this.data.duration,
    price : this.data.price
  });

  this.getServices();
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
      
    })
  }

  closeUpdateBox(){
    this.dialogRef.close(UpdateServiceComponent);
  }

}
