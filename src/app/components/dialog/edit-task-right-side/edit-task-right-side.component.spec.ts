import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskRightSideComponent } from './edit-task-right-side.component';

describe('EditTaskRightSideComponent', () => {
  let component: EditTaskRightSideComponent;
  let fixture: ComponentFixture<EditTaskRightSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskRightSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskRightSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
