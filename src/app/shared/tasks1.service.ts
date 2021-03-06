import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";
import * as moment from "moment";

export interface Task{
    id?: string
    title: string 
    date?: string 
    time?: string 
}

interface CreateResponse{
    name: string
}

@Injectable({providedIn: 'root'})
export class TaskService{
    public static url = 'https://todo-58d0f-default-rtdb.firebaseio.com/tasks '

    constructor(private http: HttpClient){
    }

    create(task: Task): Observable<Task>{
        console.log(task.time)
        return this.http.post<CreateResponse>(`${TaskService.url}/${task.date}.json/`, task)
        .pipe(map(res => {
            return {...task, id: res.name}
        }))
    }

    load(date: moment.Moment){
        return this.http
            .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
                .pipe(map(tasks => {
                    if (!tasks) {
                        return []
                    }
                    return Object.keys(tasks).map(key => ({...tasks[<any>key], id: key}))
                }))
    }

    remove(task: Task): Observable<void> {
        return this.http
          .delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
    }
}    