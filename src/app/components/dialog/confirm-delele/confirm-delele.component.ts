import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delele',
  templateUrl: './confirm-delele.component.html',
  styleUrls: ['./confirm-delele.component.scss']
})
export class ConfirmDeleleComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}