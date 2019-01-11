import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MOCK_ROUTES } from '../../test-helpers/router.mock';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService;

  beforeEach(async(() => {

    authService = jasmine.createSpyObj('AuthService', ['createNewUser']);
    const createUserSpy = authService.createNewUser.and.returnValue(of({}));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(MOCK_ROUTES),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        RegistrationComponent
      ],
      providers: [
        {provide: AuthService, useValue: authService}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call registrationFormInfo metod', async() => {
    spyOn(component, 'registrationFormInfo');
    component.registrationForm.patchValue({
      email: '1@email.com',
      password: '12345678',
      name: 'Name'
     });
    fixture.detectChanges();
    await fixture.whenStable();
    const el = document.querySelector('button[type=submit]') as HTMLElement;
     el.click();
    fixture.detectChanges();
    await fixture.whenStable();
     expect(component.registrationFormInfo).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalledWith(['posts/my-post']);
 });
});
