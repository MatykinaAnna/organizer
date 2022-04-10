import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
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
  tasks: Task[] = []
  

  constructor(public dateService: DateService, 
              private tasksService: TaskService) {

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)

    })
  }

  ngOnInit(): void {
    //this.dateService.date
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks=>{
      this.tasks = tasks
    })
  }

  submit(){
    const title = this.form.value 
    const task: Task = {
      title: title.title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    }
    this.tasksService.create(task).subscribe(task=>{
      this.tasks.push(task)
      this.form.reset()
    }, err=>console.error(err))
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.error(err))
  }

}
