import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentSlotsComponent } from '../appointment-slots/appointment-slots.component';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  staffList: any[] = [];
  selectedStaff: any = null;
  serviceList: any[] = [];
  service_id: any;
  serviceGroup: any[] = [];

  customerDetails: any;
  selectedDate: Date | null = null;
  selectedTimes: Date | null = null;
  availableTimes: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00'];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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
    private dialog:MatDialog
  ) 
  {
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
  }

  ngOnInit(): void {
    this.getAllStaff();
    this.getAllService();

    this.firstFormGroup.get('fullname')?.valueChanges.subscribe(value => {
      this.customerDetails.fullname = value;
    });

    this.firstFormGroup.get('contact_no')?.valueChanges.subscribe(value => {
      this.customerDetails.contact_no = value;
    });

    this.secondFormGroup.get('service')?.valueChanges.subscribe(value => {
      this.service = value;
      this.updateServiceDetails(value);
    });
  }

  openTimePicker(event: any) {
    this.selectedDate = event.value;
    if (this.selectedDate) {
      this.showAvailableTimeSlots(this.selectedDate);
    } else {
      alert('Please select a valid date');
    }
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
    return this.selectedStaff === staff;
  }

  getAllService() {
    this.httpClient.get('http://127.0.0.1:8000/api/getAllService').subscribe((res:any) => {
      this.serviceList= res;
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

  onConfirm(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.selectedStaff){
      const selectedServices = this.secondFormGroup.value.service;
      const serviceIds = Array.isArray(selectedServices) ? selectedServices : [selectedServices];
      console.log(serviceIds);
      
  
      const appointmentData = {
        customer_id :this.customerDetails.id,
        service_id:serviceIds,
        staff_id:this.selectedStaff.id,
        date: this.selectedDate?.toISOString().split('T')[0],
        time:this.selectedTimes
      };
      console.log(appointmentData);
      
      this.httpClient.post('http://127.0.0.1:8000/api/addAppointment',appointmentData).subscribe((res:any)=>{
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
