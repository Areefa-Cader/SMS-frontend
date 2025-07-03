import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { AuthService } from 'src/app/auth.service';
import { UpdateStaffComponent } from '../update-staff/update-staff.component';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss'],
  providers: [DatePipe],
})
export class StaffProfileComponent implements OnInit{

  // ---Notification---

  //access the child component
  @ViewChild('notificationsMenu') notificationsMenu!: MatMenu;
  @ViewChild('newAppointmentMenu') newAppointmentMenu!: MatMenu;
  @ViewChild('reminderMenu') reminderMenu!: MatMenu;

  hidden = false;

  hasNewAppointment: boolean = false;
  hasReminder: boolean = false;

  notifications: any[] = [];
  unreadCount: number = 0;

  // ---Notification---

  //update details


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

  constructor(private httpClient:HttpClient, 
    private datePipe:DatePipe,
     private authService:AuthService,
    private dialog:MatDialog,
    
    ) {
    this.profilePic = 'assets/profile.png';
  }

  ngOnInit(): void {
    const staffId = this.authService.getLoggedInUserId();
    console.log(staffId);
    
    this.httpClient.get('http://127.0.0.1:8000/api/getNotifications/' + staffId).subscribe((res:any)=>{
      console.log(res);
      
      this.notifications = res.notification;
      console.log(this.notifications);

      //checks if there is atleast one notification in the notifications array with the type ""

      this.hasNewAppointment = this.notifications.some((n: any) => n.type === 'New Appointment');
      this.hasReminder = this.notifications.some((n: any) => n.type === 'Reminder');
      this.unreadCount = res.notification.filter((n :any)=> !n.is_read).length;
    });

    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      this.profilePic = storedProfilePic;
    }

    this.fullname = localStorage.getItem('fullname') || '';
    this.email = localStorage.getItem('email') || '';
    this.contact_no = localStorage.getItem('contact_no') || '';
    this.dob = this.datePipe.transform((localStorage.getItem('dob') || ''), 'yyyy-MM-dd');
    this.role = localStorage.getItem('role') || '';
    this.status = localStorage.getItem('status') || '';
    this.username = localStorage.getItem('username') || '';
  }

  getMenuTrigger(type:string):MatMenu{
    switch(type){
      case 'New Appointment':
        return this.newAppointmentMenu;
      case 'Reminder':
        return this.reminderMenu;
      default:
        return this.notificationsMenu;   
    }

  }

  markAsRead(notificationId: number): void {
    this.httpClient.put('http://127.0.0.1:8000/api/markAsRead'+ notificationId, {}).subscribe(() => {
      this.unreadCount--;

      const notification = this.notifications.find((n:any)=> n.id=== notificationId);
      console.log(notification);
      
      if(notification){
        notification.is_read = true;
      }
    });
  }
  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
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



 updateBox(){
  const dialogRef = this.dialog.open(UpdateStaffComponent, {
    data : {
      'id':this.authService.getLoggedInUserId(),
      'fullname' : this.fullname,
      'email':this.email,
      'contact_no':this.contact_no,
      'role':this.role
    } 
    
  });
  
  dialogRef.afterClosed().subscribe(data => {
    console.log(data);
    
    if (data) {
      // If the dialog returns updated data, update the profile with it
      this.fullname= data.fullname;
      this.email = data.email;
      this.contact_no = data.contact_no;
      this.role = data.role;
    }
  });

}

}
