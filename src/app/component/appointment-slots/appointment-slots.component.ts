import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-slots',
  templateUrl: './appointment-slots.component.html',
  styleUrls: ['./appointment-slots.component.scss']
})
export class AppointmentSlotsComponent {
  timeSlots: any[];

  constructor(
    public dialogRef: MatDialogRef<AppointmentSlotsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.timeSlots = data.timeSlots;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
