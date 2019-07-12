import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DscribeCommand} from '../../models/dscribe-command';

@Component({
	selector: 'dscribe-command-button',
	templateUrl: './command-button.component.html',
	styleUrls: ['./command-button.component.css']
})
export class CommandButtonComponent implements OnInit {

	@Input()
	command: DscribeCommand;

	@Output()
	execute: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	performAction() {
		this.execute.emit();
	}
}
