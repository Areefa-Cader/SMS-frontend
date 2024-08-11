import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  hide=true;
  username:any='';
  password:any='';

  constructor(private router:Router,
     private toastr:ToastrService , 
     private httpClient:HttpClient,
     private authService:AuthService 
    ){

  }

  ngOnInit(): void {
    
  }

  login(){
    
    let form ={
      'username': this.username,
      'password':this.password
    }
    
    this.httpClient.post('http://127.0.0.1:8000/api/login',form).subscribe(
      (res:any) => {
        console.log(res);
        
        if (res.error) {
          this.toastr.error(res.error);
          return;
      }

      console.log(res.response.userRole);

      localStorage.setItem('id',res.response.id)
      localStorage.setItem('token', res.response.token);
      localStorage.setItem('userRole', res.response.userRole);
      localStorage.setItem('fullname', res.response.fullname);
      localStorage.setItem('email', res.response.email);
      localStorage.setItem('contact_no', res.response.contact_no);
      localStorage.setItem('dob', res.response.dob);
      localStorage.setItem('role', res.response.role);
      localStorage.setItem('status', res.response.status);
      localStorage.setItem('username', res.response.username);

      this.authService.setLoggedInUserId(res.response.id);
      console.log(this.authService.setLoggedInUserId(res.response.id));
      
        
        if(res.response.userRole == 'admin'){
          this.toastr.success(res.message);
          this.router.navigate(['/dashboard']);
          
        }else if(res.response.userRole == 'owner'){
          this.toastr.success(res.message);
          this.router.navigate(['/dashboard']);

        }else if(res.response.userRole == 'staff'){

          this.toastr.success(res.message);
          
          this.router.navigate(['/staff-profile']);
        }

        else{
          this.toastr.error("Invalid User Role");
        }
    
      },
      
    );
  }

  logout(){
    this.httpClient.post('http://127.0.0.1:8000/api/logout',{}).subscribe(()=>{
      localStorage.clear();
      this.router.navigate([""]);
    })
  }
    
    
    
  }


