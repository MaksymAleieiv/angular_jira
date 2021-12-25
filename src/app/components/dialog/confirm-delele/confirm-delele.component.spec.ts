import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleleComponent } from './confirm-delele.component';

describe('ConfirmDeleleComponent', () => {
  let component: ConfirmDeleleComponent;
  let fixture: ComponentFixture<ConfirmDeleleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
