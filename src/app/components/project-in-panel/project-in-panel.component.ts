import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../Interfaces/Project';

@Component({
  selector: 'app-project-in-panel',
  templateUrl: './project-in-panel.component.html',
  styleUrls: ['./project-in-panel.component.scss']
})
export class ProjectInPanelComponent implements OnInit {
  @Input() project!: Project;
  @Input() isCurrentUserAdmin!: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
