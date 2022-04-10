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

@Injectable({providedIn: 'root'})
export class TaskService{
    public static url = 'https://todo-58d0f-default-rtdb.firebaseio.com/tasks '

    constructor(private http: HttpClient){
    }
}    