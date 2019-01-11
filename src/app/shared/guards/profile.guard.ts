import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,  } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private router: Router, private tokenService: TokenService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.tokenService.isLogIn()) {
            return true;
        } else {
         this.router.navigate(['auth/login']);
         return false;
    }
 }
}
