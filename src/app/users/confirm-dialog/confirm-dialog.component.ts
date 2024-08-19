import { SharedModule } from './../../sharedModule';
import { ConfirmationService } from 'primeng/api';
import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    private confirmationService: ConfirmationService,
  ) {}

  show(header: string, message: string, accept: () => void, reject?: () => void) {
    this.confirmationService.confirm({
      header,
      message,
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text custom-reject',
      acceptButtonStyleClass: 'custom-accept',
      accept,
      reject
    });
  }
}
