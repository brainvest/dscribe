import { Component, OnInit } from '@angular/core';
import { SettingModel } from '../models/setting-item.model';

@Component({
	standalone: false,
	selector: 'dscribe-host-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	settingItems: SettingModel[] = [];
	constructor() { }
	ngOnInit() {
		this.settingItems.push({ name: 'App instance', url: 'app-instance-management' });
		this.settingItems.push({ name: 'App type', url: 'app-type-management' });
	}

}

