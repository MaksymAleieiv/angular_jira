import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddUserToProjectComponent } from 'src/app/components/dialog/add-user-to-project/add-user-to-project.component';
import { ConfirmActionComponent } from 'src/app/components/dialog/confirm-action/confirm-action.component';
import { EditStatusComponent } from 'src/app/components/dialog/edit-status/edit-status.component';
import { EditTaskComponent } from 'src/app/components/dialog/edit-task/edit-task.component';
import { ImageViewerComponent } from 'src/app/components/dialog/image-viewer/image-viewer.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmActionDialog(title: string): Observable<boolean> {
    let dialogRef = this.dialog.open(ConfirmActionComponent, {data: {title}});
    return dialogRef.afterClosed().pipe()
  }

  openCreateStatusDialog(): Observable<any> {
    let dialogRef = this.dialog.open(EditStatusComponent);
    return dialogRef.afterClosed().pipe()
  }

  openEditStatusDialog(title: string): Observable<any> {
    let dialogRef = this.dialog.open(EditStatusComponent, {data: title, maxHeight: '100vh', autoFocus: false});
    return dialogRef.afterClosed().pipe()
  }

  openCreateTaskDialog(statusId: number): Observable<any> {
    let dialogRef = this.dialog.open(EditTaskComponent, {data: {statusId}, maxHeight: '100vh', autoFocus: false, disableClose: true});
    return dialogRef.afterClosed().pipe()
  }

  openEditTaskDialog(taskId: number): Observable<any> {
    let dialogRef = this.dialog.open(EditTaskComponent, {data: {taskId}, maxHeight: '100vh', autoFocus: false});
    return dialogRef.afterClosed().pipe()
  }

  openAddUserToProject(): Observable<any> {
    let dialogRef = this.dialog.open(AddUserToProjectComponent, {maxHeight: '100vh', autoFocus: false, disableClose: true});
    return dialogRef.afterClosed().pipe()
  }

  overlayOpened() {
    return this.dialog.openDialogs.length > 0
  }

  openImage(image: string) {
    this.dialog.open(ImageViewerComponent, {data: {image}, maxHeight: '100vh', autoFocus: false })
  }
}
