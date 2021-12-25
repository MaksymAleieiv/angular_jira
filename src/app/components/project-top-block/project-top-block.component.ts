import { Component, OnInit } from '@angular/core';
import { FullProjectService } from 'src/app/services/store/full-project.service';

@Component({
  selector: 'app-project-top-block',
  templateUrl: './project-top-block.component.html',
  styleUrls: ['./project-top-block.component.scss']
})
export class ProjectTopBlockComponent implements OnInit {

  constructor(private fullProject: FullProjectService) { }

  ngOnInit(): void {
  }

  createNewStatusBlock() {
    this.fullProject.createNewStatusBlock()
  }


}
