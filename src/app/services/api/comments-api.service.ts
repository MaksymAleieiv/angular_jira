import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  constructor(private http: HttpClient) { }

  formFormData(data: any) {
    const formData: any = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if(key !== 'files' && key !== 'removedFilesIds' && key !== 'newFiles') formData.append(key, value + '')
    }
    
    for(let i = 0; i < data.newFiles.length; i++){
      formData.append('file', new Blob([data.newFiles[i]], { type: 'image/png' }), data.newFiles[i].name);
    }
    return formData
  }

  getComments(projectId: number | undefined, taskId: number | undefined) {
    return this.http.get('projects/' + projectId + '/tasks/' + taskId+ '/comments/')
  }

  createComment(projectId: number | undefined, taskId: number | undefined, comment: any) {
    let formData = this.formFormData(comment);
    
    return this.http.post('projects/' + projectId + '/tasks/' + taskId+ '/comments', formData)
  }

  editComment(projectId: number | undefined, taskId: number | undefined, commentId: number, comment: any) {
    this.deleteFiles(comment.removedFilesIds)

    let formData = this.formFormData(comment);

    return this.http.put('projects/' + projectId + '/tasks/' + taskId+ '/comments/' + commentId, formData)
  }

  deleteComment(projectId: number| undefined, taskId: number| undefined, commentId: number) {
    return this.http.delete('projects/' + projectId + '/tasks/' + taskId+ '/comments/' + commentId,)
  }

  deleteFiles(fileIds: number[]) {
    for(let i = 0; i < fileIds.length; i++){
      this.http.delete<any>('files/' + fileIds[i]).subscribe()
    }
  }
}
