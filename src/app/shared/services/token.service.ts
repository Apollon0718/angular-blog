import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenService {

    public profileSubject: BehaviorSubject<any>;
    constructor() {
        this.profileSubject = new BehaviorSubject({});
    }
    public setToken(token) {
        return localStorage.setItem('auth_token', token);
    }
    public getToken() {
        return localStorage.getItem('auth_token');
    }
    public isLogIn() {
        return this.getToken() !== null;
    }
    public delToken() {
        this.profileSubject.next('');
        return localStorage.removeItem('auth_token');
    }
}
