import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {

  private statusSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private statusSemaphore: number = 0;

  constructor() {}

  public get status$(): Observable<boolean> {
    return this.statusSub.asObservable();
  }

  public get status(): boolean {
    return this.statusSub.getValue();
  }

  public capture(): void {
    this.statusSemaphore++;
    if (this.statusSemaphore === 1) {
      this.statusSub.next(true);
    }
  }

  public release(): void {
    if (this.statusSemaphore) {
      this.statusSemaphore--;
      if (!this.statusSemaphore) {
        this.statusSub.next(false);
      }
    }
  }
}
