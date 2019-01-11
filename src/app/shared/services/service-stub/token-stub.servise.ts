import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token.service';

export class TokenServiseStub implements TokenService {
    public profileSubject: BehaviorSubject<any>;
    constructor() {
        this.profileSubject = new BehaviorSubject({});
    }
    public setToken(token) {}
    public getToken() {
        return 'token';
    }
    public isLogIn() {
        return true;
    }
    public delToken() {
        return;
    }
  }
