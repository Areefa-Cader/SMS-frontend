import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { CustomerComponent } from './component/customer/customer.component';
import { StaffComponent } from './component/staff/staff.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { AppointmentListComponent } from './component/appointment-list/appointment-list.component';
import { AddAppointmentComponent } from './component/add-appointment/add-appointment.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { ServiceComponent } from './component/service/service.component';
import { StaffAvailablitiyComponent } from './component/staff-availablitiy/staff-availablitiy.component';
import { StaffLoginComponent } from './component/staff-login/staff-login.component';
import { StaffRegisterComponent } from './component/staff-register/staff-register.component';
import { ConfirmationBoxComponent } from './component/confirmation-box/confirmation-box.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { UpdateAppointmentComponent } from './component/update-appointment/update-appointment.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ViewInvoiceComponent } from './component/view-invoice/view-invoice.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'',component:LoginComponent},
  {path:"dashboard",component:MainDashboardComponent},
  {path:'dashboard-content', component:MainContentComponent},
  {path:'customer', component:CustomerComponent},
  {path:"customer-list",component:CustomerListComponent},
  {path:'staff', component:StaffComponent},
  {path:'service',component:ServiceComponent},
  {path:'appointment', component:AppointmentComponent},
  {path:'appointment-list', component:AppointmentListComponent},
  {path:'add-appointment', component:AddAppointmentComponent},
  {path:'update-appointment',component:UpdateAppointmentComponent},
  {path:'staff-availability',component:StaffAvailablitiyComponent},
  {path:'staff-login',component:StaffLoginComponent},
  {path:'staff-register',component:StaffRegisterComponent},
  {path:'confirm-box', component:ConfirmationBoxComponent},
  {path:'invoice',component:InvoiceComponent},
  {path:'view-invoice',component:ViewInvoiceComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
