import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DscribeModule} from '../../projects/dscribe/src/lib/dscribe.module';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './auth/auth.service';

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
