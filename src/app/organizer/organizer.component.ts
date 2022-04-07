import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../shared/date.service';
import { TaskService } from '../shared/tasks.service';
import { Task } from '../shared/tasks.service'

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup

  constructor(public dateService: DateService, private tasksService: TaskService) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  submit(){
    const title = this.form.value  
    const task: Task = {
      title: title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    }
    this.tasksService.create(task)
    console.log('title',title)
  }
}
