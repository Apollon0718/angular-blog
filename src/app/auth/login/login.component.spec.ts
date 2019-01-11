import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MOCK_ROUTES } from '../../test-helpers/router.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService;

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['logInUser']);
    const logInSpy = authService.logInUser.and.returnValue(of({}));
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(MOCK_ROUTES), ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the  onSubmit', async () => {
    spyOn(component, 'onSubmit');
    component.loginForm.patchValue({
      email: '1@user.com',
      password: '12345678'
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const btn = document.querySelector('button[type=submit]') as HTMLElement;
    expect(component.loginForm.valid).toBeTruthy();
    btn.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call logInUser', async () => {
    component.loginForm.patchValue({
      email: '1@user.com',
      password: '12345678'
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const btn = document.querySelector('button[type=submit]') as HTMLElement;
    expect(component.loginForm.valid).toBeTruthy();
    btn.click();
    expect(authService.logInUser).toHaveBeenCalledWith({
      email: '1@user.com',
      password: '12345678'
    });
  });

  /*it('should navigate when logIn', async () => {
    const spy = this.routerSpy.navigate as jasmine.Spy;
    expect(spy).toBe('posts/my-post');
  });*/
});
