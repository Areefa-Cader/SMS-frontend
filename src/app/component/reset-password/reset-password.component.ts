import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPasswordComponent } from '../success-password/success-password.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  
  hide = true;
  email:any=''
  password:any='';
  confirm_password: any ='';
  resetToken ='';

  constructor(private dialog:MatDialog,private route:ActivatedRoute, private httpClient:HttpClient,
    private toastr:ToastrService
  ){

    route.queryParams.subscribe(params=>{
      this.resetToken = params['token'];
    })

  }

  ngOnInit(): void {
    
  }

  onSubmit(){

    let form ={
      'email' : this.email,
      'password':this.password,
      'confirm_password':this.confirm_password,
      'resetToken':this.resetToken
    }

    this.httpClient.post('http://127.0.0.1:8000/api/changePassword', form).subscribe((res:any)=>{
      console.log(res);
      if(res.message){
        // this.toastr.success(res.message)
        this.dialog.open(SuccessPasswordComponent);
      }

      
    }, (error:any)=>{
      console.log(error);
      this.toastr.error(error);
    }
  )
  }

 

}
