import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  hide=true;
  username:any='';
  password:any='';

  constructor(private router:Router, private toastr:ToastrService , private httpClient:HttpClient){

  }

  ngOnInit(): void {
    
  }

  login(){
    
    let form ={
      'username': this.username,
      'password':this.password
    }
    console.log(form);
    
    this.httpClient.post('http://127.0.0.1:8000/api/login',form).subscribe(
      (res:any) => {
        console.log(res);
        
        if (res.error) {
          this.toastr.error(res.error);
          return;
      }

      console.log(res.response.userRole);
        
        if(res.response.userRole == 'admin'){
          this.toastr.success(res.message);
          this.router.navigate(['/dashboard']);
          
        }else if(res.response.userRole == 'owner'){
          this.toastr.success(res.message);
          this.router.navigate(['/owner-dashboard']);

        }else if(res.response.userRole == 'staff'){
          this.toastr.success(res.message);
          // this.router.navigate(['/owner-dashboard']);
        }

        else{
          this.toastr.error("Invalid User Role");
        }
    
      },
      
    );
  }

  logout(){
    this.httpClient.post('http://127.0.0.1:8000/api/login',{}).subscribe(()=>{
      this.router.navigate([""]);
    })
  }
    
    
    
  }


