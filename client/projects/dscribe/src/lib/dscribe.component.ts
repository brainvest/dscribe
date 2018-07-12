import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'dscribe-root',
	template: `
		<router-outlet></router-outlet>
	`,
	styles: []
})
export class DscribeComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

}
