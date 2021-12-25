import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTasksManagerTableComponent } from './project-tasks-manager-table.component';

describe('ProjectTasksManagerTableComponent', () => {
  let component: ProjectTasksManagerTableComponent;
  let fixture: ComponentFixture<ProjectTasksManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTasksManagerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTasksManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
