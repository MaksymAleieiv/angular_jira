import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesSwiperComponent } from './files-swiper.component';

describe('FilesSwiperComponent', () => {
  let component: FilesSwiperComponent;
  let fixture: ComponentFixture<FilesSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
