import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
	selector: 'dscribe-host-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(public authService: AuthService) {
	}
}
