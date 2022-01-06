import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CurrentUser } from 'src/app/components/Interfaces/CurrentUser';
import { FullProject } from 'src/app/components/Interfaces/FullProject';
import { Status, Task } from 'src/app/components/Interfaces/Task';
import { ProjectApiService } from '../api/project-api.service';
import { TasksApiService } from '../api/tasks-api.service';
import { DialogService } from '../other/dialog.service';
import { SnackBarService } from '../other/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class FullProjectService {
  fullProject!: FullProject;
  statuses: any = []
  projectChange: Subject<FullProject> = new Subject<FullProject>()

  constructor(private projectApi: ProjectApiService, private snackBar: SnackBarService, private dialog: DialogService, private tasksApi: TasksApiService, private router: Router, private route: ActivatedRoute) { }

  setFullProject(project: FullProject) {
    this.fullProject = project;
  }

  updateValue(project: FullProject | null = null) {
    let updatedProject: any = {...project};
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
        this.setFullProject(res.project)
        this.projectChange.next(res.project)
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Couldn\'t load project info');
      }
    })
  }

  createNewStatusBlock() {
    this.dialog.openCreateStatusDialog().subscribe(title => {
      if(!!title) {
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
      }
    })
  }

  addHiddenTaskToStatusBlock(status: Status) {
    let initialTask = {
        projectId: this.fullProject.id,
        title: 'hidden title',
        description: 'hidden description',
        typeId: 1,
        statusId: status.id,
        userId: 1
      }
    this.tasksApi.createTask(this.fullProject.id, initialTask).subscribe({
      next: (res) => {
        this.createTaskUtil(res.task)
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Couldn\'t create new status');
      }
    })
  }
  
  openEditTask(taskId: number) {
    let urlTree = this.router.parseUrl(this.router.url);
    if(!this.dialog.overlayOpened()) {

      urlTree.queryParams['taskId'] = taskId;
      this.router.navigateByUrl(urlTree); 

      this.dialog.openEditTaskDialog(taskId).subscribe(() => {

        urlTree.queryParams = [];
        this.router.navigateByUrl(urlTree);

      });
    }
  }

  // basic

  private editTaskUtil(task: Task) {
    let project = {...this.fullProject};
    project.tasks = project.tasks.filter(taskP => taskP.id !== task.id);
    project.tasks.push(task)
    this.updateValue(project)
  }

  private createTaskUtil(task: Task) {
    let project = {...this.fullProject};
    project.tasks.push(task)
    this.updateValue(project)
  }

  private deleteTaskUtil(taskId: number) {
    let newFullProject = {
      ...this.fullProject,
      tasks: this.fullProject.tasks.filter(task => task.id !== taskId)
    }
    this.updateValue(newFullProject)
  }

  private deleteStatusUtil(statusId: number) {
    let newFullProject = {
      ...this.fullProject,
      tasks: this.fullProject.tasks.filter(task => task.status.id !== statusId)
    }
    this.updateValue(newFullProject)
  }

  private editStatusUtil(status: Status) {
    let newFullProject = {...this.fullProject};
    let tasksWithUpdatedStatus = newFullProject.tasks.filter(task => task.status.id === status.id);

    tasksWithUpdatedStatus.forEach(task => {
      task.status = status;
    })
    let tasksWithoutUpdate = newFullProject.tasks.filter(task => task.status.id !== status.id)

    newFullProject.tasks = [
      ...tasksWithUpdatedStatus,
      ...tasksWithoutUpdate
    ]
    this.updateValue(newFullProject)
  }

  private editProjectUtil(changes: any) {
    let project = {...this.fullProject, ...changes};
    this.updateValue(project)
  }

  // utils

  createTask(statusId: number) {
    this.dialog.openCreateTaskDialog(statusId).subscribe(task => {
      if(!!task) {
        this.tasksApi.createTask(this.fullProject.id, task).subscribe({
          next: (res: any) => {
            this.createTaskUtil(res.task)
          },
          error: (err) => {
            console.log(err)
            this.snackBar.open('Couldn\'t create new task');
          }
        })
      }
    })
  }

  editTask(taskId: number, changes: any){
    this.tasksApi.editTask(this.fullProject.id, taskId, changes).subscribe({
      next: (res) => {
        this.editTaskUtil(res.task)
      }
    })
  }

  deleteTaskById(taskId: number) {
    this.dialog.openConfirmActionDialog('Are you sure you want to delte this ?').subscribe(confirmed => {
      if(confirmed) {
        this.tasksApi.deleteTask(this.fullProject.id, taskId).subscribe({
          next: () => {
            this.deleteTaskUtil(taskId)
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

  changeTasksStatus(taskId: number, statusId: number) {
    this.tasksApi.changeTasksStatus(this.fullProject.id, taskId, {statusId}).subscribe({
      next: (res) => {
        this.editTaskUtil(res.task)
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open('Failed to update the status');
      }
    })
  }

  // tasks

  editStatus(statusId: number, title: string) {
    this.dialog.openEditStatusDialog(title).subscribe({
      next: (res) => {
        this.projectApi.editStatus(statusId, res).subscribe({
          next: (res: any) => {
            this.editStatusUtil(res.status)
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

  deleteStatus(statusId: number) {
    this.dialog.openConfirmActionDialog('Are you sure you want to delete this ?').subscribe(confirmed => {
      if(confirmed) {
        this.projectApi.deleteStatus(statusId).subscribe({
          next: () => {
            this.deleteStatusUtil(statusId)
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

  // status

  openAddUserToProject() {
    this.dialog.openAddUserToProject()
  }

  addUsersToProject(users: CurrentUser[]) {
    this.projectApi.addUsersToProject(this.fullProject.id, users)
    let changes = {
      users: [
        ...this.fullProject.users,
        ...users
      ]
    }
    this.editProjectUtil(changes)
    this.snackBar.open('Users were successfully added')
  }

  editProject(changes: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.projectApi.editProject(this.fullProject.id, changes).subscribe({
        next: () => {
          this.snackBar.open('Changes were successfully saved')
          this.editProjectUtil(changes);
          resolve(true)
        },
        error: (err) => {
          this.snackBar.open(err.error.message)
          reject()
        }
      })
    })
  }

  // project
  
  

}
