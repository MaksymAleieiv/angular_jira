import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FullProject } from 'src/app/components/Interfaces/FullProject';
import { CurrentUserStoreService } from 'src/app/services/store/current-user-store.service';
import { FullProjectService } from 'src/app/services/store/full-project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  projectId: number = 0;
  project!: FullProject;
  subscription: Subscription;
  isCurrentUserAdmin = false;

  constructor(private route: ActivatedRoute, private fullProjectStore: FullProjectService, private currentUserStorage: CurrentUserStoreService) {
    this.subscription = this.fullProjectStore.projectChange.subscribe((value) => {
      console.log(value)
      this.project = value;
    });
    this.isCurrentUserAdmin = currentUserStorage.isCurrentUserAdmin;
  }

  ngOnInit(): void {
    this.getCurrentProjectId();
  }

  getCurrentProjectId() {
    this.route.paramMap.subscribe(params => {
      let projectId = Number.parseInt(params.get('projectId') || '0');
      this.projectId = projectId;
      
      this.fullProjectStore.fetchProjectById(projectId)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
