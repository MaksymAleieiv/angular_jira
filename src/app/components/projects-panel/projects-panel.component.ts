import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from '../Interfaces/Project';
import SwiperCore, { SwiperOptions, FreeMode } from 'swiper';
import { ProjectApiService } from 'src/app/services/api/project-api.service';
import { SnackBarService } from 'src/app/services/other/snack-bar.service';

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-projects-panel',
  templateUrl: './projects-panel.component.html',
  styleUrls: ['./projects-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsPanelComponent implements OnInit {
  projects: Project[] = [];
  doesCurrentUserHaveMoreThanTenProjects = true;

  showBeginCurtains = false;
  showEndCurtains = false;
  
  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 12,
    freeMode: true,
    slideClass: 'projects-panel__slide'
  };

  constructor(private projectApi: ProjectApiService, private zone: NgZone, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(): void {
    this.projectApi.fetchMyProjects().subscribe({
      next: (res: any) => {
        this.projects = res.projects;
        //let value = res.projects;
        //value[0].users = Array(25).fill(value[0].users[0])
        //this.projects = this.transformProjects(Array(25).fill(value[0]))
      },
      error: () => {
        this.snackBar.open('Couldn\'t load your projects ;c');
      }
    })
  }

  transformProjects(value: Project[], length: number = 10): Project[] {
    if(value.length > length) this.doesCurrentUserHaveMoreThanTenProjects = false;
    value.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
    return value.slice(0, length);
  }

  onSwipe(swiper: any) {
    this.zone.run(() => {
      this.showBeginCurtains = !swiper.isBeginning;
      this.showEndCurtains = !swiper.isEnd;
    })
  }

  onBeginning() {
    this.zone.run(() => {
      this.showBeginCurtains = false;
    })
  }

  onEnd() {
    this.zone.run(() => {
      this.showEndCurtains = false;
    })
  }

}
