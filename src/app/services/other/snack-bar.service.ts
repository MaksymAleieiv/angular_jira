import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(comment: string, buttonText: string = "OK", duration: number = 2000) {
    this.snackBar.open(comment, buttonText, {duration, horizontalPosition: 'left', verticalPosition: 'bottom'})
  }

}
