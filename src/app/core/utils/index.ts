import { Observable, Subject } from 'rxjs';

export function dispatch<T>(action: Observable<T> | T): Observable<T> {
  const subject = new Subject<T>();

  if (action instanceof Observable) {
    action.subscribe(subject);
  } else {
    subject.next(action);
    subject.complete();
  }

  return subject.asObservable();
}
