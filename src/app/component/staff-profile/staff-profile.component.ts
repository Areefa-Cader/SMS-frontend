import { Component, computed, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit{
  role : any[] =[
    "Hair Artist",
    "Skin Care Artsit",
    "Bridal Dresser"
   ]
   
  isChecked = true;
  panelOpenState = false;
  sideNavCollapsed = signal(true);
 

  profileSize = computed(()=>this.sideNavCollapsed() ? '50' : '70');

 collapsed = signal(true);
 sidenavwidth = computed(()=>this.collapsed() ? '65px':'200px');

 profilePic: string;

  constructor() {
    this.profilePic = localStorage.getItem('profilePic') || 'assets/profile.png';
  }

  ngOnInit(): void {
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      this.profilePic = storedProfilePic;
    }
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

}
