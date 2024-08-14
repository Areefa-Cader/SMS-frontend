import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'src/app/utility.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentSlotsComponent } from '../appointment-slots/appointment-slots.component';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { MatSelect } from '@angular/material/select';
import { DatePipe } from '@angular/common';

interface TimeSlot {
  time: string;
  isBooked: boolean;
  appointments:any;
  staffName?: string;
  serviceName?: string;
}


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
  providers: [DatePipe]
})
export class AddAppointmentComponent implements OnInit {
  staffList: any[] = [];
  selectedStaff: any = null;
  serviceList: any[] = [];
  service_id: any;
  serviceGroup: any[] = [];

  customerDetails: any;
  selectedDate:  Date |any;
  selectedTimes: Date | null = null;
  availableTimes: TimeSlot[] = [];
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
    private dialog:MatDialog,
    private toastr:ToastrService,
    private datePipe:DatePipe
  ) 
  {
    this.firstFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required,],
      email: ['', Validators.required ],
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

    this.selectedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    console.log(this.selectedDate);
    
      if (this.selectedDate) {

        const today = new Date();
        today.setHours(0,0,0,0);

        const formatToday:any = this.datePipe.transform(today, 'yyyy-MM-dd');
        console.log(formatToday);
        
        if(this.selectedDate < formatToday){
         
          this.toastr.warning('Please select a valid date')
        }else{
          this.showAvailableTimeSlots(this.selectedDate);
        }
        
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
    const customerData = this.firstFormGroup.value;
    this.httpClient.post('http://127.0.0.1:8000/api/addCustomerDetails', customerData).subscribe((res: any) => {
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
        this.httpClient.post('http://127.0.0.1:8000/api/addCustomer', customerData).subscribe((res: any) => {
          if (res.success) {
            this.customerDetails = res.customer;
            this.toastr.success('Customer added successfully');
          } else {
            this.toastr.error(res.message);
          }
        }, (error) => {
          this.toastr.error(error.message);
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

    const selectedServiceDetails = this.serviceList.find(service=>service.service_name === selectedServices);

    if(selectedServiceDetails){
      const totalDuration = this.utilityService.convertDurationToSeconds(selectedServiceDetails.duration);
      const totalPrice = parseFloat(selectedServiceDetails.price);

      const totalDurationReadable = this.utilityService.convertTimeToReadableFormat(
        new Date(totalDuration *1000).toISOString().substr(11,8)
      );
    

    this.secondFormGroup.patchValue({
      duration: totalDurationReadable,
      price: totalPrice.toFixed(2)
    });
  }
  }

  // confirmSelection(select: MatSelect) {
  //   select.close();
  //   this.updateServiceDetails(this.secondFormGroup.get('service')?.value);
  // }

  onConfirm(){
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.selectedStaff) {
      const selectedServices = this.secondFormGroup.value.service;
      // const serviceIds = Array.isArray(selectedServices) ? selectedServices : [selectedServices];

      console.log(selectedServices);
      
      
      const customerData = {
        fullname: this.firstFormGroup.value.fullname,
        contact_no: this.firstFormGroup.value.contact_no,
        gender:this.firstFormGroup.value.gender,
        email: this.firstFormGroup.value.email,
        address: this.firstFormGroup.value.address
      };
  
      this.httpClient.post('http://127.0.0.1:8000/api/addCustomerDetails', customerData).subscribe(
        (customerRes: any) => {
          const customerId = customerRes.customer.id;

          const selectedService = this.serviceList.find(service => service.service_name === selectedServices);

         
          
          if(selectedService){
          const appointmentData = {
            customer_id: customerId,
            service_id:selectedService.id,
            staff_id: this.selectedStaff.id,
            date: this.selectedDate,
            time: this.selectedTimes,
            price: this.secondFormGroup.value.price,
          };

          console.log(selectedService.id);
          
  
          this.httpClient.post('http://127.0.0.1:8000/api/addAppointment', appointmentData).subscribe(
            (res: any) => {
              console.log(res);
              if(res.message){
                this.toastr.success(res.message);
                this.router.navigate(["/appointment"]);
              }else{
                this.toastr.error(res.error);
              }
            },
            (error: any) => {
              console.error(error);
              this.toastr.error('Error creating appointment');
            }
          );
        }else{
          this.toastr.error('service is not found');
        }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Error creating or updating customer');
        }
      );
    } else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  //timeslots

  showAvailableTimeSlots(date: Date) {
   const requestDate = {date: date};
   
   
   this.httpClient.post('http://127.0.0.1:8000/api/getAllTimeSlots', requestDate).subscribe((res:any)=>{
    if(Array.isArray(res.timeSlots)){
    
    this.availableTimes = res.timeSlots.map((slot:any)=>({
      time: slot.time,
      isBooked: slot.isBooked,
      staffName: slot.staffName,
      serviceName: slot.serviceName
    }));
  }
  

  console.log('available times' , this.availableTimes);
  
    
   });
  }

  //alert message

  move(stepper:MatStepper, step : number){
    if(step === 1 && !this.firstFormGroup.valid){
     this.toastr.warning('Please fill the required field');
    }else if(step === 2 && !this.secondFormGroup.valid){
      this.toastr.warning('Please fill the required field'); 
    }
    else if(step === 3 && !this.selectedStaff){
      this.toastr.warning('Please select a staff');
    }
    else{
      stepper.next();
    }

  }
}
