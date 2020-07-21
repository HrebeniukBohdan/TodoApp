import { SignInCredentials, SignInResponse } from '@core/model/auth.model';
import { Observable, of } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { API_SERVICE, IApiService } from '@shared/service/api.service';
import { tap } from 'rxjs/operators';
import { ServiceType } from '@core/enum';

@Injectable()
export class AuthService {

  private readonly NAME_TOKEN: string = 'x-auth-token';
  private tokenValue: string;

  constructor(@Inject(API_SERVICE) private apiService: IApiService<ServiceType>) { }

  public signIn(credentials: SignInCredentials): Observable<SignInResponse> {
    return this.apiService.post<SignInResponse>(ServiceType.AUTH, 'login', credentials).pipe(
      tap(respose => this.saveToken(respose.token))
    );
  }

  public signOut(): Observable<void> {
    localStorage.removeItem(this.NAME_TOKEN);
    this.tokenValue = null;
    return of();
  }

  public get isAuthenticated(): boolean {
    return !!this.token;
  }

  public get token(): string {
    if (!this.tokenValue) {
      this.tokenValue = localStorage.getItem(this.NAME_TOKEN);
    }
    return this.tokenValue;
  }

  private saveToken(value: string): void {
    this.tokenValue = value;
    localStorage.setItem(this.NAME_TOKEN, value);
  }
}
