import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/tasks.service'
import { TaskService } from '../shared/tasks1.service';
import { DateService } from '../shared/date.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-organizer1',
  templateUrl: './organizer1.component.html',
  styleUrls: ['./organizer1.component.css']
})
export class Organizer1Component implements OnInit {

  profileForm = new FormGroup({
    task_07: new FormControl(''),
    task_08: new FormControl(''),
    task_09: new FormControl(''),
    task_10: new FormControl(''),
    task_11: new FormControl(''),
    task_12: new FormControl(''),
    task_13: new FormControl(''),
    task_14: new FormControl(''),
    task_15: new FormControl(''),
    task_16: new FormControl(''),
  });

  constructor(public dateService: DateService, 
             private tasksService: TaskService,
             private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  submit(){
    console.log(this.profileForm.value);
  }

}
