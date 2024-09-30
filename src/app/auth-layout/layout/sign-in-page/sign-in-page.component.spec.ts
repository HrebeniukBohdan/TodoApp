import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignInPageComponent } from './sign-in-page.component';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: {} }, 
        { provide: Router, useValue: {} }
      ],
      declarations: [ SignInPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
