import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/tasks1.service'
import { TaskService } from '../shared/tasks1.service';
import { DateService } from '../shared/date.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs';



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

  tasks: Task[] = []

  constructor(public dateService: DateService, 
             private tasksService: TaskService,
             private fb: FormBuilder) {}

  ngOnInit(): void {
    //this.dateService.date
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks=>{
      this.tasks = tasks

      console.log(tasks)
    })
  }

  getTime(name: string):string{
    return name.split('_')[1]
  }

  submit(){
    // console.log(this.profileForm.value);

    for (let key in this.profileForm.value){
      if (this.profileForm.value[key] != ''){
        const task: Task = {
          title: this.profileForm.value[key],
          date: this.dateService.date.value.format('DD-MM-YYYY'),
          time: this.getTime(key)
        }
        console.log(task)
        this.tasksService.create(task).subscribe(task=>{
          console.log(task)
          // this.tasks.push(task)
          // this.form.reset()
        }, err=>console.error(err))
      }
    }
  }

}
