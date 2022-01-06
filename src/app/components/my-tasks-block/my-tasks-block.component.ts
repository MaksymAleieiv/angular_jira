import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksApiService } from 'src/app/services/api/tasks-api.service';
import { Task } from '../Interfaces/Task';

@Component({
  selector: 'app-my-tasks-block',
  templateUrl: './my-tasks-block.component.html',
  styleUrls: ['./my-tasks-block.component.scss']
})
export class MyTasksBlockComponent implements OnInit {

  my_tasks: Task[] = []

  constructor(private tasksApi: TasksApiService, private router: Router) { }

  ngOnInit(): void {
    this.tasksApi.getMyTasks().subscribe({
      next: (res: any) => {
        this.my_tasks = res.tasks;
      }
    })
  }

  openThisTask(projectId: number, taskId: number) {
    this.router.navigateByUrl('project/' + projectId + '?taskId=' + taskId); 
  }

}
