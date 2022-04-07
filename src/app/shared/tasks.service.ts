import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map } from 'rxjs/operators'

export interface Task{
    id?: string
    title: string 
    date?: string 
}

@Injectable({providedIn: 'root'})
export class TaskService{
    public static url = 'https://todo-58d0f-default-rtdb.firebaseio.com/tasks '

    constructor(private http: HttpClient){
    }

    create(task: Task){
        this.http.post<any>(`${TaskService.url}/${task.date}.json`, task)
        .pipe(map(res => {
            console.log('Responce',res)
            return res
        }))
    }
}