import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/components/Interfaces/Project';
import { Status } from 'src/app/components/Interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http: HttpClient) {}

  fetchMyProjects(): Observable<Project[]>{
    return this.http.get<Project[]>('projects').pipe();
  }

  fetchProjectById(id: number): Observable<Project>{
    return this.http.get<Project>('projects/' + id).pipe();
  }

  createNewStatusBlock(newStatus: any): Observable<any>{
    return this.http.post<any>('statuses', newStatus).pipe()
  }

  deleteStatus(statusId: number): Observable<any> {
    return this.http.delete<any>('statuses/' + statusId).pipe()
  }

  editStatus(statusId: number, title: string): Observable<any> {
    return this.http.put<any>('statuses/' + statusId, {title}).pipe()
  }

}
