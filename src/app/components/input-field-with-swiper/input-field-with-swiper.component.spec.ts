import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldWithSwiperComponent } from './input-field-with-swiper.component';

describe('InputFieldWithSwiperComponent', () => {
  let component: InputFieldWithSwiperComponent;
  let fixture: ComponentFixture<InputFieldWithSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFieldWithSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldWithSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
