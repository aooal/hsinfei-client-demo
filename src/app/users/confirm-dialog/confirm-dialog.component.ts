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
      accept,
      reject
    });
  }
  getButtonLabel(header: string): string {
    if (header === '啟用用戶') {
      return '確定啟用';
    } else if (header === '停用用戶') {
      return '確定停用';
    } else {
      return '確認';
    }
  }
}
