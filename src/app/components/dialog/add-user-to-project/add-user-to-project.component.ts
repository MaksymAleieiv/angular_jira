import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProjectApiService } from 'src/app/services/api/project-api.service';
import { DialogService } from 'src/app/services/other/dialog.service';
import { SnackBarService } from 'src/app/services/other/snack-bar.service';
import { FullProjectService } from 'src/app/services/store/full-project.service';
import { CurrentUser } from '../../Interfaces/CurrentUser';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';

@Component({
  selector: 'app-add-user-to-project',
  templateUrl: './add-user-to-project.component.html',
  styleUrls: ['./add-user-to-project.component.scss']
})
export class AddUserToProjectComponent implements OnInit {

  
  private email$ = new Subject<string>();
  emailInInput = '';
  newUser: any = null;
  users: CurrentUser[] = []

  loading = false;

  focused = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionComponent>,
    private projectApi : ProjectApiService,
    private fullProject: FullProjectService,
    private dialog: DialogService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.email$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((email: string) => {

      let trimedEmail = email.trim()

      if(this.fullProject.fullProject.users.filter(user => user.email === trimedEmail).length === 0) {
        if(trimedEmail) {
          this.loading = true;
          this.projectApi.findUserByEmail(trimedEmail).subscribe({
            next: (res) => {
              this.newUser = res.user
            }, 
            error: () => {
              this.newUser = null
            },
            complete: () => {
              this.loading = false;
            }
          })
        }
      }else {
        this.snackBar.open('This user is already in project');
      }

      
    });
  }

  onChange(target: any) {
    this.emailInInput = target.value;
    this.email$.next(target.value)
  }

  addToEmailsList() {
    this.users.push(this.newUser)
    this.newUser = null;
    this.emailInInput = '';
  };

  removeUserFromList(userId: number) {
    this.users = this.users.filter(user => user.id !== userId)
  }

  addUsersToProject() {
    this.fullProject.addUsersToProject(this.users)
  }

  onClose() {
    if(this.users.length > 0)
      this.dialog.openConfirmActionDialog('You have unsaved changes... Are you sure you want to leave ?').subscribe(confirmed => {
        if(confirmed) this.dialogRef.close()
      })
    else this.dialogRef.close()
  }

  onFocus() {
    this.focused = true;
  }

  onBlur(e: any) {
    if(e.relatedTarget?.id !== 'add-user') this.focused = false;
  }

}
