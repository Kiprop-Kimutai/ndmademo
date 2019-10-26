import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthService } from './pages/login/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('Auth guard allowed access');
        console.log(state.url);
        return this.checkLogin(state.url);
    }
    checkLogin(redirectUrl: string): boolean {
        if (this.authService.getToken() !== null) {
            return true;
        }
        this.authService.redirecturl = redirectUrl;
        this.router.navigate(['/login']);
        return false;
    }
}
