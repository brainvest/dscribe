import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {AppRoutingModule} from './app-routing.module';
import {DscribeModule} from '../../../src/lib/dscribe.module';
import {DataTypeCardComponent} from './custom-templates/data-type-card/data-type-card.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { SampleListComponent } from './sample-list/sample-list.component';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		DscribeModule,
		MatCardModule,
		MatButtonModule
	],
	declarations: [
		AppComponent,
		AuthCallbackComponent,
		DataTypeCardComponent,
		SampleListComponent,
	],
	entryComponents: [
		DataTypeCardComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {
	}
}
