import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  public type: boolean;
  public title: string;
  public message: string;
  public arrayMessage: boolean;
  public cancelButton: boolean;

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
    this.arrayMessage = Array.isArray(this.message);
    this.cancelButton = data.cancelButton;
  }

  public close(reason: boolean): void {
    this.dialogRef.close(reason);
  }

}
