import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toggleable-input-field',
  templateUrl: './toggleable-input-field.component.html',
  styleUrls: ['./toggleable-input-field.component.scss']
})
export class ToggleableInputFieldComponent implements OnChanges {

  @Input() inputText!: string;
  @Input() placeholderText!: string;
  @Input() className!: string;
  @Input() maxLength!: number;

  @Output() output = new EventEmitter();

  text!:string;

  textBoxActive = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.text = changes['inputText'].currentValue;
  }

  onFocus() {
    this.textBoxActive = true;
  }

  onBlur(e: any) {
    if(e.relatedTarget?.name !== 'confirmTextChange') this.onCancel()
  }

  onConfirm() {
    if(this.text.trim().length > 0) {
      this.output.emit({
        inputText : this.text
      })
      this.textBoxActive = false;
    }
  }

  onCancel() {
    if(this.textBoxActive) {
      this.textBoxActive = false;
      this.text = this.inputText;
    }
  }

  onChange(e: any) {
    this.text = e.target.value;
  }

}
