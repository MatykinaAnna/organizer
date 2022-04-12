import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../shared/tasks1.service'
import { TaskService } from '../shared/tasks1.service';
import { DateService } from '../shared/date.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs';


interface TaskForForm{
  time: string,
  name: string
}


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
    task_17: new FormControl(''),
    task_18: new FormControl(''),
    task_19: new FormControl(''),
  });

  tasks: Task[] = []
  @Output() onChanged = new EventEmitter<boolean>();

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

  taskIsSet(time: string):{rez: boolean, title?: string, task?: Task}{
    let index = this.tasks.findIndex((item: Task):boolean=>{
      return (item.time == time)
    })
    if (index > -1){
      return {rez: true, title: this.tasks[index].title, task: this.tasks[index]}
    } else {
      return {rez: false}
    }
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
          // this.tasks.push(task)
          // this.form.reset()
          this.onChanged.emit(true);
        }, err=>console.error(err))
      }
    }
  }

  remove(time: string) {
    let task = this.taskIsSet(time).task
    console.log('task', task)
    if (task){
      this.tasksService.remove(task).subscribe(() => {
        // this.tasks = this.tasks.filter(t => t.id !== task.id)
        this.onChanged.emit(true);
      }, err => console.error(err))
    }
  }

}
