import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/components/Interfaces/CurrentUser';
import { Project } from 'src/app/components/Interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http: HttpClient) {}

  fetchMyProjects(): Observable<Project[]>{
    return this.http.get<Project[]>('projects').pipe();
  }

  fetchProjectById(projectId: number): Observable<Project>{
    return this.http.get<Project>('projects/' + projectId).pipe();
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

  editProject(projectId: number, changes: any) {
    return this.http.put<any>('projects/' + projectId, changes).pipe()
  }

  findUserByEmail(email: string) {
    return this.http.post<any>('users/exist', {email}).pipe()
  }

  addUsersToProject(projectId: number, users: CurrentUser[]) {
    users.forEach(user => {
      this.http.post<any>('project/' + projectId + '/users/', {
        userId: user.id
      })
    })
  }

  deleteUserFromProject() {

  }

}
