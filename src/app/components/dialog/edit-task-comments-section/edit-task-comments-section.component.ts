import { Component, Input, OnInit } from '@angular/core';
import { CommentsApiService } from 'src/app/services/api/comments-api.service';
import { DialogService } from 'src/app/services/other/dialog.service';
import { CurrentUserStoreService } from 'src/app/services/store/current-user-store.service';

@Component({
  selector: 'app-edit-task-comments-section',
  templateUrl: './edit-task-comments-section.component.html',
  styleUrls: ['./edit-task-comments-section.component.scss']
})
export class EditTaskCommentsSectionComponent implements OnInit {

  @Input() taskId: number | undefined = 0;
  @Input() projectId: number | undefined = 0;

  comments: any = [];
  currentUser: any;

  currentlyEditingCommentId = 0

  constructor(private commentsApi: CommentsApiService,
    private currentUserStore: CurrentUserStoreService,
    private dialog: DialogService
  ) { 
    this.currentUser = currentUserStore.currentUser;
  }

  ngOnInit(): void {
    this.fetchComments()
  }

  fetchComments() {
    this.commentsApi.getComments(this.projectId, this.taskId).subscribe({
      next: (res: any) => {
        this.comments = res.comments;
      }
    })
  }

  createComment(data:any) {
    data.message = data.inputText;
    delete data.inputText
    this.commentsApi.createComment(this.projectId, this.taskId, data).subscribe({
      next: (res: any) => {
        this.comments.push(res.comment)
      }
    })
  }

  editComment(data: any, commentId: number) {
    this.currentlyEditingCommentId = 0;
    data.message = data.inputText;
    delete data.inputText
    this.commentsApi.editComment(this.projectId, this.taskId, commentId, data).subscribe({

    })
  }

  resetCurrentlyEditingCommentId() {
    this.currentlyEditingCommentId = 0;

  }

  deleteComment(commentId: number) {
    this.dialog.openConfirmActionDialog('Are you sure you want to delete this ?').subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.commentsApi.deleteComment(this.projectId, this.taskId, commentId).subscribe({
            next: () => {
              this.comments = this.comments.filter((comment: any) => comment.id !== commentId)
            }
          })
        }
      }
    })
  }

  turnOnEditMode(commentId: number) {
    this.currentlyEditingCommentId = commentId
  }

}
