import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  constructor(private http: HttpClient) {}

  deleteTask(projectId: number, taskId: number): Observable<any>{
    return this.http.delete<any>('projects/' + projectId + '/tasks/' + taskId).pipe();
  }

  changeTasksStatus(projectId: number, taskId: number, task: any): Observable<any>{
    console.log(projectId, taskId, task)
    return this.http.put<any>('projects/' + projectId + '/tasks/' + taskId, task).pipe();
  }

  createTask(projectId: number, task: any): Observable<any>{
    return this.http.post<any>('projects/' + projectId + '/tasks', task).pipe()
  }

}
