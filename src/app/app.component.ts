import { Component } from '@angular/core';
import { DateService } from './shared/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

   organizer1:boolean=true

   onChanged(event:boolean){
     console.log('onChanged')
    this.organizer1=false
    setTimeout(()=>{
      this.organizer1=true
    }, 0)
   }

   constructor(private DateService: DateService){}

}
