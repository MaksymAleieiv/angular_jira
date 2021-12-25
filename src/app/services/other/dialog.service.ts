import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleleComponent } from 'src/app/components/dialog/confirm-delele/confirm-delele.component';
import { CreateStatusComponent } from 'src/app/components/dialog/create-status/create-status.component';
import { EditStatusComponent } from 'src/app/components/dialog/edit-status/edit-status.component';
import { EditTaskComponent } from 'src/app/components/dialog/edit-task/edit-task.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDeletingDialog(): Observable<boolean> {
    let dialogRef = this.dialog.open(ConfirmDeleleComponent);
    return dialogRef.afterClosed().pipe()
  }

  openCreateStatusDialog(): Observable<any> {
    let dialogRef = this.dialog.open(CreateStatusComponent);
    return dialogRef.afterClosed().pipe()
  }

  openEditStatusDialog(title: string): Observable<any> {
    let dialogRef = this.dialog.open(EditStatusComponent, {data: title});
    return dialogRef.afterClosed().pipe()
  }

  openEditTaskDialog(): Observable<any> {
    let dialogRef = this.dialog.open(EditTaskComponent);
    return dialogRef.afterClosed().pipe()
  }
}
