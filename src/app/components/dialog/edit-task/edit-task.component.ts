import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/other/snack-bar.service';
import { TypesService } from 'src/app/services/other/types.service';
import { FullProjectService } from 'src/app/services/store/full-project.service';
import { FullProject } from '../../Interfaces/FullProject';
import { Task, Type } from '../../Interfaces/Task';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnDestroy {

  fullProject!: FullProject
  task!: Task

  subscription!: Subscription

  taskForm!: FormGroup;
  types: Type[] = [];

  typeColor = '';

  files: any = [];
  newFiles: any = [];
  removedFilesIds: any = [];

  lastConfirmedValues: any = {};



  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    private snackBar: SnackBarService,
    private projectStore: FullProjectService,
    private typesService: TypesService,
    @Inject(MAT_DIALOG_DATA) public data: {statusId?: number, taskId?: number}
  ) {
    if(data.taskId){
      this.setFullProject(projectStore.fullProject)
      this.description?.clearValidators()
    }
    else {
      this.fullProject = projectStore.fullProject
      this.setTypesArray()
      this.initializeForm()
    }
  }

  ngOnInit(): void {
    this.setFullProjectSubsription()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  
  closeDialog() {
    this.dialogRef.close()
  }

  setFullProject(project: FullProject) {
    this.fullProject = project;
    this.task = project.tasks.filter(task => task.id === this.data.taskId)[0];
    if(!!this.task?.title){
      this.initializeForm()
      this.setFormValues()
      this.setTypesArray()
    }
  }

  setFullProjectSubsription() {
    this.subscription = this.projectStore.projectChange.subscribe({
      next: (value: FullProject) => {
        this.setFullProject(value)
      }
    })
  }

  initializeForm(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(this.task?.title || '', {
        validators : [Validators.minLength(1), Validators.required],
        updateOn: 'change'
      }),
      description: new FormControl(this.task?.description || null, {
        validators: [Validators.required]
      }),
      statusId: new FormControl(this.data?.statusId || this.task?.status.id || '', {
        validators : [Validators.minLength(1), Validators.required],
        updateOn: 'change'
      }),
      typeId: new FormControl(this.task?.type.id || '', {
        validators : [Validators.minLength(1), Validators.required],
        updateOn: 'change'
      }),
      userId: new FormControl(this.task?.user.id || '', {
        validators : [Validators.minLength(1), Validators.required],
        updateOn: 'change'
      })
    });
  }

  setTypesArray() {
    this.types = this.typesService.types
  }

  setFormValues() {
    if(!!this.task) {
      let {title, description, files, status, type, user}: any = this.task
      let statusId = status.id;
      let typeId = type.id;
      let userId = user.id;
      this.files = files;
      this.taskForm.setValue({
        title,
        description,
        statusId,
        typeId,
        userId
      })
    }
    if(!!this.data?.statusId) {
      this.statusId?.setValue(this.data.statusId)
    }
  }

  confirmCreate() {
    this.onSubmit()
  }

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get statusId() { return this.taskForm.get('statusId'); }
  get typeId() { return this.taskForm.get('typeId'); }
  get userId() { return this.taskForm.get('userId'); }

  onSubmit(): void {
    let newTask = {
      ...this.taskForm.value,
      files: this.files,
      newFiles: this.newFiles,
      removedFilesIds: this.removedFilesIds
    }
    console.log(newTask)
    if(this.taskForm.valid) {
      this.dialogRef.close(newTask)
    }else {
      this.taskForm.updateValueAndValidity()
      let errors: any = [];
      Object.keys(this.taskForm.controls).forEach(key => {
        const controlErrors: any = this.taskForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            errors.push({[key]: keyError})
          });
        }
      });
      if(errors) {
        let firstError: any = Object.keys(errors[0])[0] + ' ' + Object.values(errors[0])[0]
        this.snackBar.open(firstError)
      }
    }
  }

  get url(): string {
    return document.location.toString()
  }

  onTaskTitleChangeConfirm(e: any) {
    this.title?.setValue(e.inputText)

    this.updateTask({
      title: e.inputText,
    })
  }

  onTypeChanged(e: any) {
    this.typeId?.setValue(e.value)
    this.typeColor = this.types.filter(type => type.id === e.value)[0].color;

    this.updateTask({
      typeId: e.value,
    })
  }

  setDescriptionAndFiles(data: any) {
    this.files = data.files;
    this.newFiles = data.newFiles;
    this.removedFilesIds = data.removedFilesIds;
    this.description?.setValue(data.inputText)

    this.updateTask({
      files: data.files,
      newFiles: data.newFiles,
      removedFilesIds: data.removedFilesIds,
      description: data.inputText
    })
    this.newFiles = [];
  }

  setUserIdAndStatusId(data: any) {
    this.userId?.setValue(data.userId)
    this.statusId?.setValue(data.statusId)

    this.updateTask({
      userId: data.userId,
      statusId: data.statusId
    })
  }

  updateTask(changes: any) {
    this.taskForm?.updateValueAndValidity()
    if(this.task && this.taskForm.valid) this.projectStore.editTask(this.task.id, changes)
  }
}
