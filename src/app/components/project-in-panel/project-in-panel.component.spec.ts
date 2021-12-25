import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInPanelComponent } from './project-in-panel.component';

describe('ProjectInPanelComponent', () => {
  let component: ProjectInPanelComponent;
  let fixture: ComponentFixture<ProjectInPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
