import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';

import { AlertService, SnackBarProps } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.alertService.openSnackBar$.subscribe((notification) => {
      if (!notification) return;

      this.openSnackBar(notification);
    });
  }

  openSnackBar({ message, panelClassValue }: SnackBarProps) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: [panelClassValue]
    });
  }
}
