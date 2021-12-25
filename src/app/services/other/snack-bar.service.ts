import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, buttonText: string = "OK", duration: number = 2000) {
    this.snackBar.open(message, buttonText, {duration, horizontalPosition: 'right', verticalPosition: 'bottom'})
  }

}
