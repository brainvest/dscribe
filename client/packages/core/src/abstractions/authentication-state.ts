import type {Observable} from 'rxjs';
export interface AuthenticationState {
	tokenProvider: () => {headerName: string; headerValue: string}[];
	authChanged$: Observable<{isAuthenticated: boolean}>;
}
