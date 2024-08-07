import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  getAllServices() {
    throw new Error('Method not implemented.');
  }
  convertSecondsToHHMMSS(totalDurationSeconds: any): string {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  //  convert time to minutes 
  convertTimeToReadableFormat(time: string): string {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    let readableFormat = '';

    if (hours > 0) {
      readableFormat += `${hours} h `;
    }
    if (minutes > 0) {
      readableFormat += `${minutes} min`;
    }
    if (readableFormat === '') {
      readableFormat = `${seconds} sec`; 
    }
    
    return readableFormat.trim();
  }

   //  convertion "HH:MM:SS" to total seconds
   convertDurationToSeconds(duration: string): number {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }
}
