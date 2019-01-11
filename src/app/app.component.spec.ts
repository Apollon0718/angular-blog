import {  async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TokenService } from './shared/services/token.service';
import { AuthService } from './shared/services/auth.service';
import { TokenServiseStub } from './shared/services/service-stub/token-stub.servise';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';


describe('AppComponent', () => {
  let fixture;
  let component;
  let app;
  let authService;

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['getProfile']);
    const getProfileSpy = authService.getProfile.and.returnValue(of({}));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: TokenService, useClass: TokenServiseStub},
        {provide: AuthService, useValue: authService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should getProfile', async() => {
    await fixture.whenStable();
    expect(authService.getProfile).toHaveBeenCalled();
  });
});

