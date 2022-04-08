import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";
import * as moment from "moment";

export interface Task{
    id?: string
    title: string 
    date?: string 
}

interface CreateResponse{
    name: string
}

@Injectable({providedIn: 'root'})
export class TaskService{
    public static url = 'https://todo-58d0f-default-rtdb.firebaseio.com/tasks '

    constructor(private http: HttpClient){
    }

    load(date: moment.Moment){
        return this.http
            .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
                .pipe(map(tasks => {
                    if (!tasks) {
                        return []
                    }
                    // console.log(
                    //     Object.keys(tasks).map(key => ({...tasks[<any>key], id: key}))
                    // )
                    return Object.keys(tasks).map(key => ({...tasks[<any>key], id: key}))
                }))
    }

    create(task: Task): Observable<Task>{
        return this.http.post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
        .pipe(map(res => {
            console.log('Responce',res)
            return {...task, id: res.name}
        }))
    }
}