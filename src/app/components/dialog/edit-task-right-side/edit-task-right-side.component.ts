import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullProject } from '../../Interfaces/FullProject';
import { Task } from '../../Interfaces/Task';

@Component({
  selector: 'app-edit-task-right-side',
  templateUrl: './edit-task-right-side.component.html',
  styleUrls: ['./edit-task-right-side.component.scss']
})
export class EditTaskRightSideComponent implements OnInit {

  @Input() fullProject!: FullProject;
  @Input() task!: Task | undefined;
  @Input() statusId!: number | undefined;

  selectedUser: any;
  selectedStatus: any;

  users: any = []
  statuses: any = [];

  @Output() setUserAndStasus = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.setStatuses();
    this.setUsers();
    this.setSelectedUser();
    this.setSelectedStatus();
  }

  setSelectedUser() {
    this.selectedUser = this.task?.user;
  }

  setSelectedStatus() {
    if(this.statusId){
      this.selectedStatus = this.statuses.filter((status: any) => status.id === this.statusId)[0];
    }else{
      this.selectedStatus = this.task?.status;
    }
  }

  setUsers () {
    this.users = this.fullProject.users;
  }

  setStatuses() {
    let { tasks } = this.fullProject;
    if(!!tasks) {
      let statuses: any = [];
      let alreadyIn: number[] = []
      tasks.forEach((task: any) => {
        let { id, title } = task.status
        if(alreadyIn.indexOf(id) === -1) {
          alreadyIn.push(id)
          statuses.push({
            id,
            title
          })
        }
      })
      this.statuses = statuses;
    }
  }

  onChangeUser(e: any) {
    this.selectedUser = this.users.filter((user: any) => user.id === e.value)[0];
    this.outputValues()
  }

  onChangeStatus(e: any) {
    this.selectedStatus = this.statuses.filter((status: any) => status.id === e.value)[0];
    this.outputValues()
  }

  outputValues() {
    this.setUserAndStasus.emit({
      statusId: this.selectedStatus.id,
      userId: this.selectedUser.id,
    })
  }
}
