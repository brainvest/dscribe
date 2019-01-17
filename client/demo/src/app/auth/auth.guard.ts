import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService) {

	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.isLoggedIn().pipe(map(isLoggedIn => {
			if (isLoggedIn) {
				return true;
			}
			sessionStorage.setItem('returnUrl', state.url);
			this.authService.startAuthentication();
			return false;
		}));
	}
}
