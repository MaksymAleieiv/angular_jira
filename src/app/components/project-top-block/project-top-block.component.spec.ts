import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTopBlockComponent } from './project-top-block.component';

describe('ProjectTopBlockComponent', () => {
  let component: ProjectTopBlockComponent;
  let fixture: ComponentFixture<ProjectTopBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTopBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTopBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
