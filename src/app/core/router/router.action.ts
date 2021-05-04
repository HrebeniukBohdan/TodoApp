import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable()
export class RouterAction {
  constructor(private router: Router) {}

  navigate(url: string): Observable<boolean> {
    return from(this.router.navigateByUrl(url));
  }
}
