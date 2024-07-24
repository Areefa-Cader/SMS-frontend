import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit{

fullname: any='';
email:any ='';
contact_no:any ='';
dob:any ='';
role:any ='';
status:any ='';
username:any ='';
   
  isChecked = false;
  panelOpenState = false;
  sideNavCollapsed = signal(true);
 

  profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');

 collapsed = signal(true);
 sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

 profilePic: string;

  constructor(private httpClient:HttpClient) {
    this.profilePic = localStorage.getItem('profilePic') || 'assets/profile.png';
  }

  ngOnInit(): void {
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      this.profilePic = storedProfilePic;
    }

    this.fullname = localStorage.getItem('fullname') || '';
    this.email = localStorage.getItem('email') || '';
    this.contact_no = localStorage.getItem('contact_no') || '';
    this.dob = localStorage.getItem('dob') || '';
    this.role = localStorage.getItem('role') || '';
    this.status = localStorage.getItem('status') || '';
    this.username = localStorage.getItem('username') || '';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePic = e.target.result;
        localStorage.setItem('profilePic', this.profilePic);
      };
      reader.readAsDataURL(file);
    }
  }


 getProfile(){
  
   
 }


}
