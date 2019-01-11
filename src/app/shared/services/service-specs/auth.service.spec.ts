import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { User } from '../../models/user.model';
import { TokenService } from '../token.service';
import { TokenServiseStub } from '../service-stub/token-stub.servise';
import { environment } from '../../../../environments/environment';

const mockUser = {
  password: 'pas',
  name: 'name',
  email: 'email@mail.com',
} as User;
const mockLogin = {
    password: 'pas',
    email: 'email@mail.com'
};
const userProfile = {
    name: 'name',
    email: 'email'
};
const mockToken = { auth_token: 'token'};

describe('AuthService', () => {
  let injector: TestBed;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  const img: any = 'img';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: TokenService, useClass: TokenServiseStub }
      ]
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('createNewUser', () => {
    it('should return an Observable<any>', () => {
      authService.createNewUser(mockUser).subscribe(user => {
        expect(user).toEqual(mockToken);
        expect(authService.getProfile).toHaveBeenCalled();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/sign_up`, 'post to api');
      expect(req.request.method).toBe('POST');
      req.flush(mockToken);

      const newReq = httpMock.expectOne(`${environment.apiUrl}/api/profile`);
      expect(newReq.request.method).toBe('GET');
    });
  });

  describe('logInUser', () => {
    it('should return an Observable<any>', () => {
      authService.logInUser(mockLogin).subscribe(user => {
        expect(user).toEqual(mockToken);
        expect(authService.getProfile).toHaveBeenCalled();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/sign_in`, 'post to api');
      expect(req.request.method).toBe('POST');
      req.flush(mockToken);

      const newReq = httpMock.expectOne(`${environment.apiUrl}/api/profile`);
      expect(newReq.request.method).toBe('GET');
    });
  });

  describe('editAvatar', () => {
    it('should return an Observable<any>', () => {
      authService.editAvatar(img).subscribe(avatar => {
        expect(avatar).toEqual(userProfile);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/profile/avatar`);
      expect(req.request.method).toBe('PUT');
      req.flush(userProfile);
    });
  });

  describe('getProfile', () => {
    it('should return an Observable<any>', () => {
      authService.getProfile().subscribe(profile => {
        expect(profile).toEqual(userProfile);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/profile`);
      expect(req.request.method).toBe('GET');
      req.flush(userProfile);
    });
  });
});
