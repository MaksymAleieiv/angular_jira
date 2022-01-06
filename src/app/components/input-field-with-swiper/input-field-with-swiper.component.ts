import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-field-with-swiper',
  templateUrl: './input-field-with-swiper.component.html',
  styleUrls: ['./input-field-with-swiper.component.scss']
})
export class InputFieldWithSwiperComponent implements OnChanges {

  @Input() descriptionEditing = false;


  @Input() focusedFromStart = false;
  @Input() shouldCleanAfterConfirm = false;

  @Input() placeholderText: string = '';
  @Input() ClassName!: string;

  @Input() files: any = [];
  @Input() newFiles: any = [];
  @Input() removedFilesIds: any = [];
  @Input() inputText: string = '';
  @Input() canBeEditedByThisUser: boolean = true;

  @Output() setDataFromOutput = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  lastConfirmedValues: any = {};

  @ViewChild("text") textarea!: ElementRef;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['focusedFromStart']?.currentValue){
      this.startEditing()
    }
    if(changes['descriptionEditing']?.currentValue) {
      this.startEditing()
    }
  }

  setInputText(text: any) {
    this.inputText = text.target.value
  }

  startEditing() {
    this.descriptionEditing = true;
    if(this.canBeEditedByThisUser){
      this.lastConfirmedValues = {
        inputTextBefore : this.inputText,
        filesBefore : [...this.files],
        newFilesBefore : [...this.newFiles],
        removedFilesIdsBefore : [...this.removedFilesIds]
      }
      setTimeout(()=>{ // this will make the execution after the above boolean has changed (i love event loop )
        this.textarea.nativeElement.focus();
      },0); 

    }
  }

  confirmDescriptionChanges() {
    this.setDataFromOutput.emit({
      files: this.files,
      newFiles: this.newFiles,
      removedFilesIds: this.removedFilesIds,
      inputText: this.inputText
    })
    if(this.shouldCleanAfterConfirm) {
      this.files = [];
      this.newFiles = [];
      this.removedFilesIds = [];
      this.inputText = ''
    }
    this.newFiles = [];
    this.removedFilesIds = [];
    this.descriptionEditing = false;
  }

  closeDescriptionInput() {
    this.inputText = this.lastConfirmedValues.inputTextBefore;
    this.files = this.lastConfirmedValues.filesBefore
    this.newFiles = this.lastConfirmedValues.newFilesBefore
    this.removedFilesIds = this.lastConfirmedValues.removedFilesIdsBefore
    
    this.descriptionEditing = false;
    this.cancel.emit()

  }

  setFiles(filesOutput: any) {
    this.files = filesOutput.files;
    this.newFiles = filesOutput.newFiles;
    this.removedFilesIds = filesOutput.removedFilesIds;
  }


}
