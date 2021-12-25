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
 
  tasks: Task[] = [];
  sortedObjectOfTasks!: SortedTasks
  statuses:string[] = []
  statusesIds:number[] = []

  @Input() project!: FullProject

  constructor(private fullProjectStore: FullProjectService) {
  }

  ngOnChanges(changes: any): void {
    console.log(changes)
    this.tasks = changes.project.currentValue.tasks
    this.sortTasks();
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
      this.changeTasksStatus(taskId, newStatusId)
    }
  }

  dropBlock(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.statusesIds, event.previousIndex, event.currentIndex);
    moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);
  }

  sortTasks() {
    let sortedObjectOfTasks: SortedTasks = {};
    this.statuses = [];
    this.statusesIds = [];
    this.tasks.forEach((task, index) => {
      let {id, title} = task.status;

      if( this.statusesIds.indexOf(id) === -1 ) {
        this.statuses.push(title)
        this.statusesIds.push(task.status.id)
      }

      if(!sortedObjectOfTasks[id]) sortedObjectOfTasks[id] = [];

      if(task.type.id !== 5) sortedObjectOfTasks[id].push(task);

      if(index + 1 === this.tasks.length) {
        this.sortedObjectOfTasks = sortedObjectOfTasks
        console.log(sortedObjectOfTasks)
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
  
  changeTasksStatus(taskId: number, newStatusId: number) {
    this.fullProjectStore.changeTasksStatus(taskId, newStatusId)
  }

  editTask(taskId: number) {

  }

  deleteTask(taskId: number) {
    this.fullProjectStore.deleteTaskById(taskId)
  }

  editStatus(statusId: number, title: string) {
    this.fullProjectStore.editStatus(statusId, title)
  }

  deleteStatus(statusId: number) {
    this.fullProjectStore.deleteStatus(statusId)
  }
}
