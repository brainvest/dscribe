import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {AppRoutingModule} from './app-routing.module';
import {DscribeModule} from '../../../src/lib/dscribe.module';
import {DataTypeCardComponent} from './custom-templates/data-type-card/data-type-card.component';
import {MatButtonModule, MatCardModule} from '@angular/material';

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
		DataTypeCardComponent
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
