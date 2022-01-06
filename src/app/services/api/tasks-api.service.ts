import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/components/Interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  constructor(private http: HttpClient) {}

  formFormData(data: any) {
    const formData: any = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if(key !== 'files' && key !== 'removedFilesIds' && key !== 'newFiles' && key !== 'timeTracked' && key !== 'timeAllotted') formData.append(key, value + '')
    }
    
    if(data.newFiles) {
      for(let i = 0; i < data.newFiles.length; i++){
        formData.append('file', new Blob([data.newFiles[i]], { type: 'image/png' }), data.newFiles[i].name);
      }
    }

    return formData
  }

  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('my_tasks').pipe();
  }

  deleteTask(projectId: number, taskId: number): Observable<any>{
    return this.http.delete<any>('projects/' + projectId + '/tasks/' + taskId).pipe();
  }

  changeTasksStatus(projectId: number, taskId: number, task: any): Observable<any>{
    return this.http.put<any>('projects/' + projectId + '/tasks/' + taskId, task).pipe();
  }

  createTask(projectId: number, task: any): Observable<any>{
    let formData = this.formFormData(task);

    return this.http.post<any>('projects/' + projectId + '/tasks', formData).pipe()
  }

  editTask(projectId: number, taskId: number, changes: any): Observable<any>{
    if(changes.removedFilesIds) this.deleteFiles(changes.removedFilesIds)

    let formData = this.formFormData(changes);

    return this.http.put<any>('projects/' + projectId + '/tasks/' + taskId, formData).pipe()
  }

  deleteFiles(fileIds: number[]) {
    for(let i = 0; i < fileIds.length; i++){
      this.http.delete<any>('files/' + fileIds[i]).subscribe()
    }
  }

}
