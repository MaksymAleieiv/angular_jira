import { Component, EventEmitter, Input, NgZone, OnChanges, Output } from '@angular/core';
import { DialogService } from 'src/app/services/other/dialog.service';
import SwiperCore, { FreeMode, SwiperOptions } from 'swiper';

SwiperCore.use([FreeMode]);

@Component({
  selector: 'app-files-swiper',
  templateUrl: './files-swiper.component.html',
  styleUrls: ['./files-swiper.component.scss']
})
export class FilesSwiperComponent implements OnChanges {

  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 12,
    freeMode: true,
    slideClass: 'files-panel__slide'
  };

  showBeginCurtains = false;
  showEndCurtains = false;

  @Input() files: any = [];
  @Input() newFiles: any = [];
  @Input() removedFilesIds: any = [];
  @Input() descriptionEditing = false;

  fileUrls: any = []

  @Output() setFilesOutput = new EventEmitter<any>();

  constructor(
    private zone: NgZone,
    private dialog: DialogService
    ) { }

  ngOnChanges(changes: any): void {
    this.fillFileUrls()
  }

  fillFileUrls() {
    this.fileUrls = [];
    this.files.forEach((file: any) => {
      if(file.name.indexOf('blob') === -1) {
        this.fileUrls.push(
          'http://localhost:5000/' + file.name
        )
      }else {
        this.fileUrls.push(
          file.name
        )
      }
    })
  }

  setFiles() {
    this.fillFileUrls()
    this.setFilesOutput.emit({
      files : this.files,
      newFiles : this.newFiles,
      removedFilesIds: this.removedFilesIds
    })
  }
  
  onSwipe(swiper: any) {
    this.zone.run(() => {
      this.showBeginCurtains = !swiper.isBeginning;
      this.showEndCurtains = !swiper.isEnd;
    })
  }

  onBeginning() {
    this.zone.run(() => {
      this.showBeginCurtains = false;
    })
  }

  onEnd() {
    if(this.files.length > 0)
    this.zone.run(() => {
      this.showEndCurtains = false;
    })
  }

  addFile(files: any) {
    Array.from(files.target.files).forEach((file: any) => {
      let name = URL.createObjectURL(file)
      let newFile = {
        name,
        id: 'new' + file.lastModified
      }
      this.newFiles.push(file)
      this.files.push(newFile)
    })
    this.setFiles();
  }

  removeImageWithId(id: string) {
    let updatedFiles = this.files.filter((file: any) => file.id !== id)
    this.zone.run(() => {
      this.files = updatedFiles;
    })
    if(id.toString().indexOf('new') === -1) this.removedFilesIds.push(id)
    this.setFiles()
  }

  openFile(image: string) {
    this.dialog.openImage(image)
  }

}
