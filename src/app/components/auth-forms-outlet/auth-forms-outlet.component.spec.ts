import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormsOutletComponent } from './auth-forms-outlet.component';

describe('AuthFormsOutletComponent', () => {
  let component: AuthFormsOutletComponent;
  let fixture: ComponentFixture<AuthFormsOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthFormsOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormsOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
