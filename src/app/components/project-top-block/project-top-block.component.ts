import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FullProjectService } from 'src/app/services/store/full-project.service';
import { FullProject } from '../Interfaces/FullProject';

@Component({
  selector: 'app-project-top-block',
  templateUrl: './project-top-block.component.html',
  styleUrls: ['./project-top-block.component.scss']
})
export class ProjectTopBlockComponent implements OnInit, OnDestroy {

  projectTitleInput: string = '';
  project!: FullProject;

  subscription!: Subscription;

  constructor(private fullProject: FullProjectService) { }

  ngOnInit(): void {
    this.subscription = this.fullProject.projectChange.subscribe({
      next: () => {
        this.projectTitleInput = this.fullProject.fullProject.title;
        this.project = this.fullProject.fullProject
      }
    })
  }

  addUser() {
    this.fullProject.openAddUserToProject()
  }

  onOutputTitle(e: any) {
    this.projectTitleInput = e.inputText
    this.fullProject.editProject({
      title: e.inputText
    }).catch(() => {
      this.projectTitleInput = this.project.title
    })
  }

  onOutputDescription(e: any){
    this.fullProject.editProject({
      description: e.inputText
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }


}
