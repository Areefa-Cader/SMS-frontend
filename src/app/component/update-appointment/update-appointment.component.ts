import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UtilityService } from 'src/app/utility.service';
import { AppointmentSlotsComponent } from '../appointment-slots/appointment-slots.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatSelect } from '@angular/material/select';

interface TimeSlot {
  time: string;
  isBooked: boolean;
  appointments:any;
  staffName?: string;
  serviceName?: string;
}

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss'],
  providers: [DatePipe]
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
  selectedDate: any;
  selectedTimes: Date | null = null;
  availableTimes:  TimeSlot[] = [];

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
    private datePipe : DatePipe,
    private toastr: ToastrService,
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
      console.log(this.service);
      
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
       
      const serviceNames = Array.isArray(appointment.service) ?
        appointment.service.map((s: { service_name: any; }) => s.service_name) :
        [appointment.service.service_name];

        const formatTime = (time:string): string => {
          return time.slice(0,5);
        }

      this.secondFormGroup.patchValue({
        service: serviceNames,
        date: this.datePipe.transform(new Date(appointment.appointment.date), 'yyyy-MM-dd'),
        time: formatTime(appointment.appointment.time),
      }); 
      console.log('Form Values:', this.secondFormGroup.value);

      // Call updateServiceDetails to set duration and price
      this.updateServiceDetails(serviceNames);

      
      this.selectedStaff = this.staffList.find(staff => staff.id === appointment.staff.id);

      this.selectedDate = this.datePipe.transform(new Date(appointment.appointment.date), 'yyyy-MM-dd');
      this.showAvailableTimeSlots(this.selectedDate);
      console.log(this.selectedDate);
      
    });
  }

  openTimePicker(event: any) {
   this.selectedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
   console.log(this.selectedDate);
   
      if(this.selectedDate){
        const today = new Date();
        today.setHours(0,0,0,0);

        if(this.selectedDate < today){
          this.toastr.warning('Please select a valid Date');
        }else{
          this.showAvailableTimeSlots(this.selectedDate);
          
        }
        
      }
  }

  updateTime(event: any) {
    this.selectedTimes = event.value; 
    console.log(this.selectedTimes);
    
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

        // alert(res.message);
        this.httpClient.post('http://127.0.0.1:8000/api/addCustomer', customerName).subscribe((res:any) => {
          if(res.success){
            this.customerDetails = res.customer;
            this.toastr.success(res.message);
          }else{
            this.toastr.error(res.error);
          }
        },(error)=>{
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

  confirmSelection(select:MatSelect){
    select.close();
    this.updateServiceDetails(this.secondFormGroup.get('service')?.value);
  }

  onUpdate(){

    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.selectedStaff){
      const selectedServices = this.serviceDetails.id;
      
      // const serviceIds = Array.isArray(selectedServices) ? selectedServices : [selectedServices];

      console.log(selectedServices);
      
      
      const customerData = {
        fullname: this.firstFormGroup.value.fullname,
        contact_no: this.firstFormGroup.value.contact_no,
        gender: this.firstFormGroup.value.gender,
        email: this.firstFormGroup.value.email,
        address: this.firstFormGroup.value.address,
      }

      this.httpClient.post('http://127.0.0.1:8000/api/addCustomerDetails' , customerData).subscribe((res:any)=>{
        const customerId = res.customer.id;

        const appointmentData = {
          customer_id :customerId,
          service_id:selectedServices,
          staff_id:this.selectedStaff.id,
          date: this.selectedDate,
          time:this.secondFormGroup.value.time,
          price:this.secondFormGroup.value.price
        };
        console.log(this.data.id);
        

        this.httpClient.put('http://127.0.0.1:8000/api/updateAppointment/' + this.data.id , appointmentData).subscribe((res:any)=>{
          console.log(res);
          if(res.message){
            this.toastr.success(res.message);
            this.router.navigate(['/appointment']);
          }else{
            this.toastr.error(res.error);
          }
          
        },(error:any)=>{
          console.log(error);
          this.toastr.error('Error in Updating appointment')
          
        }
      );

      }, (error:any)=>{
        console.log(error);
        this.toastr.error('Error in creating or updating customer');

      }
    );
  }else{
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
 
         console.log('available times' , this.availableTimes);
        
        
    }
    })
  }
}
