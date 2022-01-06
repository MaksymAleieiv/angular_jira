import { Component,Input,OnChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from '../Interfaces/Task';
import { SortedTasks } from '../Interfaces/SortedTasks';
import { FullProjectService } from 'src/app/services/store/full-project.service';
import { FullProject } from '../Interfaces/FullProject';

 @Component({
  selector: 'app-project-tasks-manager-table',
  templateUrl: './project-tasks-manager-table.component.html',
  styleUrls: ['./project-tasks-manager-table.component.scss']
})
export class ProjectTasksManagerTableComponent implements OnChanges{
  listHeight: number = 0

  @Input() isCurrentUserAdmin = false;
  @Input() project!: FullProject
 
  tasks: Task[] = [];
  sortedObjectOfTasks!: SortedTasks
  statuses:string[] = []
  statusesIds:number[] = []


  constructor(private fullProjectStore: FullProjectService) {
  }

  ngOnChanges(changes: any): void {
    try{
      this.tasks = changes['project'].currentValue.tasks
      this.sortTasks();
    }catch{}
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let t = event.item.element.nativeElement.classList.toString().split(' ').filter(clas => clas.includes('task-id-'))[0];
      let s = event.container.element.nativeElement.classList.toString().split(' ').filter(clas => clas.includes('status-id-'))[0];
      let taskId = Number.parseInt(t.slice(8, t.length));
      let newStatusId = Number.parseInt(s.slice(10, s.length))
      this.fullProjectStore.changeTasksStatus(taskId, newStatusId)
    }
  }

  dropBlock(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.statusesIds, event.previousIndex, event.currentIndex);
    moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);
  }

  sortTasks() {
    let sortedObjectOfTasks: SortedTasks = {};
    let statuses: string[] = []
    let statusesIds: number[] = []
    this.tasks.forEach((task, index) => {
      let {id, title} = task.status;

      if( statusesIds.indexOf(id) === -1 ) {
        statuses.push(title)
        statusesIds.push(id)
      }

      if(!sortedObjectOfTasks[id]) sortedObjectOfTasks[id] = [];

      if(task.type.id !== 1) sortedObjectOfTasks[id].push(task);

      if(index + 1 === this.tasks.length) {
        this.sortedObjectOfTasks = sortedObjectOfTasks;
        this.statuses = statuses;
        this.statusesIds = statusesIds;
        this.calculateMinHeight()
      }
    })
  }

  calculateMinHeight() {
    let g: any = {}
    this.tasks.forEach(task => {
      if(g[task.status.id]) g[task.status.id]++
      else g[task.status.id] = 1
    })
    let values: number[] = Object.values(g);
    let maxTasksCount = Math.max(...values);
    this.listHeight = 96 * maxTasksCount - 1
  }

  addTask(statusId: number) {
    this.fullProjectStore.createTask(statusId)
  }

  editTask(taskId: number) {
    this.fullProjectStore.openEditTask(taskId)
  }

  deleteTask(taskId: number) {
    this.fullProjectStore.deleteTaskById(taskId)
  }

  createNewStatusBlock() {
    this.fullProjectStore.createNewStatusBlock()
  }

  editStatus(statusId: number, title: string) {
    this.fullProjectStore.editStatus(statusId, title)
  }

  deleteStatus(statusId: number) {
    this.fullProjectStore.deleteStatus(statusId)
  }
}
