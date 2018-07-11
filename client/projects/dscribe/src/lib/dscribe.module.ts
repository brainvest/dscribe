import {NgModule} from '@angular/core';
import {DscribeComponent} from './dscribe.component';
import {ListContainerComponent} from './list/list-container/list-container.component';
import {ListComponent} from './list/list/list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DscribeInterceptor} from './common/dscribe-interceptor';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatDialogModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatPaginatorModule,
	MatSortModule,
	MatTableModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddNEditComponent} from './add-n-edit/add-n-edit.component';
import {ListAddNEditDialogComponent} from './list/list-add-n-edit-dialog/list-add-n-edit-dialog.component';
import {PropertyEditorComponent} from './property-editors/property-editor.component';
import {BoolEditorComponent} from './property-editors/bool-editor.component';
import {DateEditorComponent} from './property-editors/date-editor.component';
import {DatetimeEditorComponent} from './property-editors/datetime-editor.component';
import {EntityAutoCompleteComponent} from './property-editors/entity-auto-complete.component';
import {EntityListEditorComponent} from './property-editors/entity-list-editor.component';
import {EntitySelectComponent} from './property-editors/entity-select.component';
import {TextEditorComponent} from './property-editors/text-editor.component';
import {NumberEditorComponent} from './property-editors/number-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListDeleteDialogComponent} from './list/list-delete-dialog/list-delete-dialog.component';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		ReactiveFormsModule],
	declarations: [
		DscribeComponent,
		ListContainerComponent,
		ListComponent,
		AddNEditComponent,
		ListAddNEditDialogComponent,
		PropertyEditorComponent,
		BoolEditorComponent,
		DateEditorComponent,
		DatetimeEditorComponent,
		EntityAutoCompleteComponent,
		EntityListEditorComponent,
		EntitySelectComponent,
		NumberEditorComponent,
		TextEditorComponent,
		ListDeleteDialogComponent
	],
	exports: [DscribeComponent, ListComponent],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: DscribeInterceptor, multi: true},
	],
	entryComponents: [
		ListAddNEditDialogComponent,
		ListDeleteDialogComponent
	]
})
export class DscribeModule {
}
