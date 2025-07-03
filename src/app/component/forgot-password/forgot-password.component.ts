import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  

  email:any = '';
 

  constructor(private httpClient:HttpClient, private toastr:ToastrService, private router:Router,
    
  ){

  

  }

  ngOnInit(): void {
    
  }


  onSubmit(){
    let form = {
      'email' : this.email,
    }

    this.httpClient.post('http://127.0.0.1:8000/api/sendEmailLink', form).subscribe((res:any)=>{
      console.log(res);
      this.email = '';
      if(res.message){
        this.toastr.success(res.message);
      }
      else{
       this.toastr.error(res.error);
      }
      
    },
    (error:any)=>{
      console.log(error);
      this.toastr.error(error);
    }
  )
  }

}
