import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksBlockComponent } from './my-tasks-block.component';

describe('MyTasksBlockComponent', () => {
  let component: MyTasksBlockComponent;
  let fixture: ComponentFixture<MyTasksBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTasksBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTasksBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
