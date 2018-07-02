import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DscribeModule} from '../../projects/dscribe/src/lib/dscribe.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		DscribeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
