import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  image = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {image: string},
  ) { }

  ngOnInit(): void {
    this.image = this.data.image
  }

}
