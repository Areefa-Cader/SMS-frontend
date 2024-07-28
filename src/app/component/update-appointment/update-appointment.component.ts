import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UtilityService } from 'src/app/utility.service';
import { AppointmentSlotsComponent } from '../appointment-slots/appointment-slots.component';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss']
})
export class UpdateAppointmentComponent implements OnInit{
  
  staffList: any[] = [];
  selectedStaff: any = null;
  serviceList: any[] = [];
  service_id: any;
  serviceGroup: any[] = [];
  appointmentId:any;
  serviceDetails:any;

  customerDetails: any;
  selectedDate: Date | null = null;
  selectedTimes: Date | null = null;
  availableTimes: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00'];

  firstFormGroup!: FormGroup 
  secondFormGroup!: FormGroup;

  fullname:any;
  service:any;
  contact_no:any;
  price:any;
  duration: any;


  gender: string[] = ['Male', 'Female'];

  constructor(
    private _formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private utilityService: UtilityService,
    private router:Router,
    private dialog:MatDialog,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) 
  {

    
  }

  ngOnInit(): void {

    this.getAllService();
    this.getAllStaff();
  
    this.firstFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      contact_no: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      service: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
    

    this.restoreAppointmentDetails();
    this.secondFormGroup.get('service')?.valueChanges.subscribe(value => {
      this.service = value;
      this.updateServiceDetails(value);
    });
   
  }

  

  restoreAppointmentDetails(){
    this.httpClient.get('http://127.0.0.1:8000/api/getAppointmentById/' + this.data.id).subscribe((res:any)=>{
      const appointment = res.appointment;
      this.customerDetails = appointment.customer;
      this.serviceDetails = appointment.service;
      console.log(appointment);
      
      this.firstFormGroup.patchValue({
        fullname: appointment.customer.fullname,
        email:appointment.customer.email,
        contact_no :appointment.customer.contact_no ,
        address:appointment.customer.address,
        gender :appointment.customer.gender 
      });
      this.secondFormGroup.patchValue({
        service:Array.isArray(appointment.service) ? appointment.service.map((s: { service_name: any; }) => s.service_name) : [appointment.service.service_name],
        duration:appointment.duration,
        price:appointment.price,
        date:new Date(appointment.appointment.date),
        time:appointment.appointment.time,
      });
      this.selectedStaff = this.staffList.find(staff => staff.id === appointment.staff.id);
      
      
    });
  }

  openTimePicker(event: any) {
    const dialogRef = this.dialog.open(AppointmentSlotsComponent,{
      data:{
        selectedDate : this.selectedDate,
        availableTimes: this.availableTimes
      }
    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.selectedTimes = res;
        this.secondFormGroup.patchValue({time : this.selectedTimes});
      }
    });
  }

  updateTime(event: any) {
    this.selectedTimes = event.value;
    
  }

  getAllAppointment() {
    this.httpClient.get('http://127.0.0.1:8000/api/getAllAppointment').subscribe((res) => {
      console.log(res);
    });
  }

  addCustomerDetails() {
    const customerName = this.firstFormGroup.value;
    this.httpClient.post('http://127.0.0.1:8000/api/addCustomerDetails', customerName).subscribe((res: any) => {
      if (res.customer) {
        this.customerDetails = res.customer;
        
        this.firstFormGroup.patchValue({
          fullname: this.customerDetails.fullname,
          email: this.customerDetails.email,
          contact_no: this.customerDetails.contact_no,
          gender: this.customerDetails.gender,
          address: this.customerDetails.address
        });
      } else {
        alert(res.message);
        this.httpClient.post('http://127.0.0.1:8000/api/addCustomer', customerName).subscribe((res) => {
          alert('Successfully Added');
        });
      }
    });
  }

  getAllStaff() {
    this.httpClient.get<any[]>('http://127.0.0.1:8000/api/getStaff').subscribe((res) => {
      this.staffList = res;
    });
  }

  selectStaff(staff: any) {
    this.selectedStaff = staff;
  }

  isSelected(staff: any) {
    return this.selectedStaff && this.selectedStaff.id  === staff.id;
  }

  getAllService() {
    this.httpClient.get('http://127.0.0.1:8000/api/getAllService').subscribe((res:any) => {
      this.serviceList= res;
      console.log(this.serviceList);
      this.categorizeServices();


    });
  }

  categorizeServices() {
    const serviceGroups = this.serviceList.reduce((groups, service) => {
      const category = service.service_category || 'others';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push({ value: service.service_name, viewValue: service.service_name });
      return groups;
    }, {} as { [key: string]: any[] });

    this.serviceGroup = Object.keys(serviceGroups).map(category => ({
      name: category,
      service: serviceGroups[category]
    }));
  }

  updateServiceDetails(selectedServices: any) {
    let totalDuration = 0;
    let totalPrice = 0;

    selectedServices.forEach((serviceName: string) => {
      const selectedService = this.serviceList.find(service => service.service_name === serviceName);
      if (selectedService) {
        totalDuration += this.utilityService.convertDurationToSeconds(selectedService.duration);
        totalPrice += parseFloat(selectedService.price);
      }
    });

    const totalDurationReadable = this.utilityService.convertTimeToReadableFormat(
      new Date(totalDuration * 1000).toISOString().substr(11, 8)
    );

    this.secondFormGroup.patchValue({
      duration: totalDurationReadable,
      price: totalPrice.toFixed(2)
    });
  }

  onUpdate(){

    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.selectedStaff){
      const selectedServices = this.serviceDetails.id;
      console.log(selectedServices);
      
      const serviceIds = Array.isArray(selectedServices) ? selectedServices : [selectedServices];
      console.log(serviceIds);
      
  
      const appointmentData = {
        customer_id :this.customerDetails.id,
        service_id:serviceIds,
        staff_id:this.selectedStaff.id,
        date: this.selectedDate?.toISOString().split('T')[0],
        time:this.secondFormGroup.value.time,
        price:this.secondFormGroup.value.price
      };
      console.log(appointmentData);
      
      this.httpClient.put('http://127.0.0.1:8000/api/updateAppointment/'+ this.data.id ,appointmentData).subscribe((res:any)=>{
       console.log(res);
       alert(res.message);
        this.router.navigate(["/appointment"]);
       
      });
    }else{
      alert('please fill all required fields');
    }
  }
  //timeslots

  showAvailableTimeSlots(date: Date) {
    this.httpClient.get(`http://127.0.0.1:8000/api/getAllTimeSlots?date=${date.toISOString().split('T')[0]}`).subscribe((res: any) => {
      const dialogRef = this.dialog.open(AppointmentSlotsComponent, {
        width: '300px',
        data: { timeSlots: res.timeSlots }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }
}
