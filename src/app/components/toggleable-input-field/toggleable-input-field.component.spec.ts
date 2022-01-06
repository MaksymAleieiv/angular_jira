import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleableInputFieldComponent } from './toggleable-input-field.component';

describe('ToggleableInputFieldComponent', () => {
  let component: ToggleableInputFieldComponent;
  let fixture: ComponentFixture<ToggleableInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleableInputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleableInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
