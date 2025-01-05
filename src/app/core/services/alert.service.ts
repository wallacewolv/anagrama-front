import { EventEmitter, Injectable } from '@angular/core';

export enum PanelClassEnum {
  SUCCESS = 'snackbar-success',
  ERROR = 'snackbar-error',
  WARNING = 'snackbar-warning',
}

export interface SnackBarProps {
  message: string;
  panelClassValue: PanelClassEnum;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  openSnackBar$ = new EventEmitter<SnackBarProps>();

  constructor() { }

  sendingSuccessAlert(message: string) {
    console.log(`Success: ${message}`);

    this.openSnackBar$.emit({
      message,
      panelClassValue: PanelClassEnum.SUCCESS,
    });
  }

  sendingErrorAlert(message: string) {
    console.log(`Erro: ${message}`);

    this.openSnackBar$.emit({
      message,
      panelClassValue: PanelClassEnum.ERROR,
    });
  }
}
