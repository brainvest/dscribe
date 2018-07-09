import {NgModule} from '@angular/core';
import {DscribeComponent} from './dscribe.component';
import {ListContainerComponent} from './list/list-container/list-container.component';
import {ListComponent} from './list/list/list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DscribeInterceptor} from './common/dscribe-interceptor';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		HttpClientModule,
		CommonModule],
	declarations: [DscribeComponent, ListContainerComponent, ListComponent],
	exports: [DscribeComponent, ListComponent],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: DscribeInterceptor, multi: true},
	]
})
export class DscribeModule {
}
