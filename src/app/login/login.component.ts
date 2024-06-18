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

  constructor(private router:Router, private toastr:ToastrService){

  }

  ngOnInit(): void {
    
  }

  login(){
    let form ={
      'username': this.username,
      'password':this.password
    }
    console.log(form);
     if(this.username === 'Admin' && this.password === 'admin1234' ){
        alert('Successfully Logged in!!');
        this.router.navigate(['/dashboard']);
     
     }else{
      alert('Invalid Username or password');
      this.router.navigate(['']);
     }
    
    
    
  }

}
