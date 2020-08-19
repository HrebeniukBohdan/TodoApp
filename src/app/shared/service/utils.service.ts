import { Identifiable } from '@shared/model/common.model';
import { MessageDialogComponent } from '@shared/component/message-dialog/message-dialog.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UtilsService {

  constructor(private dialog: MatDialog) { }

  public static replaceListItem<T extends Identifiable>(list: T[], item: T): T[] {
    const listCopy = [...list];
    listCopy[list.findIndex(iterItem => iterItem.id === item.id)] = item;

    return listCopy;
  }

  public showMessage(error: boolean, title: string, message: string | string[], confirmation?: boolean): Observable<boolean> {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        type: !error,
        title,
        message,
        cancelButton: confirmation,
      },
      maxWidth: '100vw'
    });

    return dialogRef.afterClosed();
  }

  public deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}
