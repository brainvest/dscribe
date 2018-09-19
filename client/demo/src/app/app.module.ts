import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {AppRoutingModule} from './app-routing.module';
import {DscribeModule} from '../../../src/lib/dscribe.module';

@NgModule({
	declarations: [
		AppComponent,
		AuthCallbackComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		DscribeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {
	}
}
