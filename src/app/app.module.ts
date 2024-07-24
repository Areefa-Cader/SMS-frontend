import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule , FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from "@angular/forms";
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';

import { HeaderComponent } from './dashboard/header/header.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { CustomerComponent } from './component/customer/customer.component';
import { StaffComponent } from './component/staff/staff.component';
import { ServiceComponent } from './component/service/service.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Header2Component } from './component/header2/header2.component';
import { AddAppointmentComponent } from './component/add-appointment/add-appointment.component';
import { AppointmentListComponent } from "./component/appointment-list/appointment-list.component";
import {NestedTreeControl} from '@angular/cdk/tree';
import { SidenavLeftComponent } from './dashboard/sidenav-left/sidenav-left.component';
import { MatMenuItem } from "@angular/material/menu";
import { ServiceListComponent } from './component/service-list/service-list.component';
import { StaffListComponent } from './component/staff-list/staff-list.component';
import { AddStaffComponent } from './component/add-staff/add-staff.component';
import { StaffAvailablitiyComponent } from './component/staff-availablitiy/staff-availablitiy.component';
import { StaffLoginComponent } from './component/staff-login/staff-login.component';
import { StaffRegisterComponent } from './component/staff-register/staff-register.component';
import { ConfirmationBoxComponent } from './component/confirmation-box/confirmation-box.component';
import { UpdateStaffComponent } from './component/update-staff/update-staff.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './component/update-customer/update-customer.component';
import { AddServiceComponent } from './component/add-service/add-service.component';
import { UpdateServiceComponent } from './component/update-service/update-service.component';
import { AppointmentSlotsComponent } from './component/appointment-slots/appointment-slots.component';
import { UpdateAppointmentComponent } from './component/update-appointment/update-appointment.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceListComponent } from './component/invoice-list/invoice-list.component';
import { ViewInvoiceComponent } from './component/view-invoice/view-invoice.component';
import { ReportComponent } from './component/report/report.component';
import { OwnerDashboardComponent } from './component/owner-dashboard/owner-dashboard.component';
import { SidenavTwoComponent } from './dashboard/sidenav-two/sidenav-two.component';
import { ServiceReportComponent } from './component/service-report/service-report.component';
import { ServiceReportListComponent } from './component/service-report-list/service-report-list.component';
import { StaffCountReportComponent } from './component/staff-count-report/staff-count-report.component';
import { StaffCountListComponent } from './component/staff-count-list/staff-count-list.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { StaffProfileComponent } from './component/staff-profile/staff-profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthInterceptor } from './auth.interceptor';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainDashboardComponent,
    HeaderComponent,
    MainContentComponent,
    CustomerComponent,
    StaffComponent,
    ServiceComponent,
    AppointmentComponent,
    Header2Component,
    AddAppointmentComponent,
    AppointmentListComponent,
    SidenavLeftComponent,
    ServiceListComponent,
    StaffListComponent,
    AddStaffComponent,
    StaffAvailablitiyComponent,
    StaffLoginComponent,
    StaffRegisterComponent,
    ConfirmationBoxComponent,
    UpdateStaffComponent,
    CustomerListComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    AddServiceComponent,
    UpdateServiceComponent,
    AppointmentSlotsComponent,
    UpdateAppointmentComponent,
    InvoiceComponent,
    InvoiceListComponent,
    ViewInvoiceComponent,
    ReportComponent,
    OwnerDashboardComponent,
    SidenavTwoComponent,
    ServiceReportComponent,
    ServiceReportListComponent,
    StaffCountReportComponent,
    StaffCountListComponent,
    ForgotPasswordComponent,
    StaffProfileComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
