import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskCommentsSectionComponent } from './edit-task-comments-section.component';

describe('EditTaskCommentsSectionComponent', () => {
  let component: EditTaskCommentsSectionComponent;
  let fixture: ComponentFixture<EditTaskCommentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskCommentsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskCommentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
