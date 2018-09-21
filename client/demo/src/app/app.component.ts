import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {EntityMetadata} from '../../../src/lib/metadata/entity-metadata';

@Component({
	selector: 'dscribe-host-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	entity: EntityMetadata;

	constructor(public authService: AuthService) {
	}
}
