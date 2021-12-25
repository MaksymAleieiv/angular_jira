import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FullProject } from 'src/app/components/Interfaces/FullProject';
import { Status } from 'src/app/components/Interfaces/Task';
import { ProjectApiService } from '../api/project-api.service';
import { TasksApiService } from '../api/tasks-api.service';
import { DialogService } from '../other/dialog.service';
import { SnackBarService } from '../other/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class FullProjectService {
  fullProject!: FullProject;
  projectChange: Subject<FullProject> = new Subject<FullProject>()

  constructor(private projectApi: ProjectApiService, private snackBar: SnackBarService, private dialog: DialogService, private tasksApi: TasksApiService) { }

  setFullProject(project: FullProject) {
    this.fullProject = project;
  }

  updateValue(project: FullProject | null = null) {
    let updatedProject: any = {...project};
    console.log(updatedProject)
    if(!!project) {
      this.setFullProject(updatedProject)
      this.projectChange.next(updatedProject)
    }else {
      this.fetchProjectById(this.fullProject.id)
    }
  }

  fetchProjectById(projectId: number) {
    this.projectApi.fetchProjectById(projectId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.setFullProject(res.project)
        this.projectChange.next(res.project)
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Couldn\'t load project info');
      }
    })
  }

  changeTasksStatus(taskId: number, newStatusId: number) {
    let task = this.fullProject.tasks.filter(task => task.id === taskId)[0];
    task.statusId = newStatusId;
    task.status.id = newStatusId;
    let indexOfTask = this.fullProject.tasks.indexOf(task);
    let updatedProject = this.fullProject

    updatedProject.tasks[indexOfTask] = task;
    this.updateValue(updatedProject)
    
    let updatedTask = {
      title: task.title,
      description: task.description,
      statusId: task.statusId,
      typeId: task.typeId,
      userId: task.userId,
    }
    this.tasksApi.changeTasksStatus(this.fullProject.id, taskId, updatedTask).subscribe({
      error: (err) => {
        console.log(err)
        this.snackBar.open('Failed to update the status');

      }
    })
  }

  deleteTaskById(taskId: number) {
    this.dialog.openConfirmDeletingDialog().subscribe(confirmed => {
      if(confirmed) {

        let newFullProject = {
          ...this.fullProject,
          tasks: this.fullProject.tasks.filter(task => task.id !== taskId)
        }
        this.updateValue(newFullProject)

        this.tasksApi.deleteTask(this.fullProject.id, taskId).subscribe({
          next: () => {
            this.snackBar.open('Task was deleted successfully');
          },
          error: (err) => {
            console.log(err)
            this.snackBar.open('Couldn\'t delete this task');
          }
        })
      }
    });

  }

  createNewStatusBlock() {
    this.dialog.openCreateStatusDialog().subscribe(title => {
      let newStatus = {
        title,
        color: '#FFFFFF'
      }
      this.projectApi.createNewStatusBlock(newStatus).subscribe({
        next: (res) => {
          this.addHiddenTaskToStatusBlock(res.status)
        },
        error: (err) => {
          console.log(err)
          this.snackBar.open('Couldn\'t create new status');
        }
      })
    })
  }

  addHiddenTaskToStatusBlock(status: Status) {
    let initialTask = {
        projectId: this.fullProject.id,
        title: 'hidden title',
        description: 'hidden description',
        typeId: 5,
        statusId: status.id,
        userId: 1
      }
    this.tasksApi.createTask(this.fullProject.id, initialTask).subscribe({
      next: (res) => {
        let updatedProject = this.fullProject;
        updatedProject.tasks.push(res.task);
        this.updateValue(updatedProject);
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Couldn\'t create new status');
      }
    })
  }

  deleteStatus(statusId: number) {
    this.dialog.openConfirmDeletingDialog().subscribe(confirmed => {
      if(confirmed) {

        let newFullProject = {
          ...this.fullProject,
          tasks: this.fullProject.tasks.filter(task => task.statusId !== statusId)
        }
        this.updateValue(newFullProject)

        this.projectApi.deleteStatus(statusId).subscribe({
          next: () => {
            this.snackBar.open('Status was deleted successfully');
          },
          error: (err) => {
            console.log(err)
            this.snackBar.open('Couldn\'t delete this status');
          }
        })
      }
    });
  }

  editStatus(statusId: number, title: string) {
    this.dialog.openEditStatusDialog(title).subscribe({
      next: (res) => {
        console.log(res)
        this.projectApi.editStatus(statusId, res).subscribe({
          next: () => {
            this.updateValue()
          },
          error: (err) => {
            console.log(err)
            this.snackBar.open('Couldn\'t rename the status');
          }
        })
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Something went wrong');
      }
    })
  }
}
