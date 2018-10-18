import {NgModule} from '@angular/core';
import {DscribeComponent} from './dscribe.component';
import {ListContainerComponent} from './list/list-container/list-container.component';
import {ListComponent} from './list/list/list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DscribeInterceptor} from './common/dscribe-interceptor';
import {
	MatAutocompleteModule,
	MatButtonModule, MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSelectModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddNEditComponent} from './add-n-edit/add-n-edit.component';
import {ListAddNEditDialogComponent} from './list/list-add-n-edit-dialog/list-add-n-edit-dialog.component';
import {PropertyEditorComponent} from './property-editors/property-editor.component';
import {BoolEditorComponent} from './property-editors/bool-editor.component';
import {DateEditorComponent} from './property-editors/date-editor.component';
import {DatetimeEditorComponent} from './property-editors/datetime-editor.component';
import {AutoCompleteMoreDialogComponent, EntityAutoCompleteComponent} from './property-editors/entity-auto-complete.component';
import {EntityListEditorComponent} from './property-editors/entity-list-editor.component';
import {EntitySelectComponent} from './property-editors/entity-select.component';
import {TextEditorComponent} from './property-editors/text-editor.component';
import {NumberEditorComponent} from './property-editors/number-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListDeleteDialogComponent} from './list/list-delete-dialog/list-delete-dialog.component';
import {FilterNodeComponent} from './filtering/components/filter-node/filter-node.component';
import {ArithmeticFilterNodeComponent} from './filtering/components/arithmetic-filter-node/arithmetic-filter-node.component';
import {ComparisonFilterNodeComponent} from './filtering/components/comparison-filter-node/comparison-filter-node.component';
import {ConstantFilterNodeComponent} from './filtering/components/constant-filter-node/constant-filter-node.component';
import {LambdaFilterNodeComponent} from './filtering/components/lambda-filter-node/lambda-filter-node.component';
import {LogicalFilterNodeComponent} from './filtering/components/logical-filter-node/logical-filter-node.component';
import {NavigationListFilterNodeComponent} from './filtering/components/navigation-list-filter-node/navigation-list-filter-node.component';
import {PropertyFilterNodeComponent} from './filtering/components/property-filter-node/property-filter-node.component';
import {FilterTreeManipulator} from './filtering/models/filter-tree-manipulator';
import {NavigationComponent} from './navigation/navigation.component';
import {MetadataManagementComponent} from './administration/metadata-management/metadata-management.component';
import {RouterModule} from '@angular/router';
import {EntityGeneralUsageNamePipe} from './administration/helpers/entity-general-usage-name.pipe';
import {AddNEditEntityComponent} from './administration/add-n-edit-entity/add-n-edit-entity.component';
import {AddNEditPropertyComponent} from './administration/add-n-edit-property/add-n-edit-property.component';
import {KeysPipe} from './helpers/keys.pipe';
import {ConfirmationDialogComponent} from './common/confirmation-dialog/confirmation-dialog.component';
import {ReleaseMetadataSettingsComponent} from './administration/release-metadata-settings/release-metadata-settings.component';
import {DisplayValuePipe} from './common/display-value-pipe';
import {TableTemplateComponent} from './list/list-templating/table-template/table-template.component';
import {CustomTemplateHostComponent} from './list/list-templating/custom-template-host/custom-template-host.component';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		CommonModule,
		RouterModule,
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
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatSortModule,
		MatSelectModule,
		MatTableModule,
		MatTooltipModule,
		MatCheckboxModule,
		MatToolbarModule,
		MatButtonToggleModule,
		MatTabsModule,
		MatProgressSpinnerModule,
		ReactiveFormsModule,
	],
	declarations: [
		DscribeComponent,
		AddNEditComponent,
		ListContainerComponent,
		ListComponent,
		ListAddNEditDialogComponent,
		ListDeleteDialogComponent,
		PropertyEditorComponent,
		BoolEditorComponent,
		DateEditorComponent,
		DatetimeEditorComponent,
		EntityAutoCompleteComponent,
		AutoCompleteMoreDialogComponent,
		EntityListEditorComponent,
		EntitySelectComponent,
		NumberEditorComponent,
		TextEditorComponent,
		FilterNodeComponent,
		ArithmeticFilterNodeComponent,
		ComparisonFilterNodeComponent,
		ConstantFilterNodeComponent,
		LambdaFilterNodeComponent,
		LogicalFilterNodeComponent,
		NavigationListFilterNodeComponent,
		PropertyFilterNodeComponent,
		NavigationComponent,
		MetadataManagementComponent,
		EntityGeneralUsageNamePipe,
		AddNEditEntityComponent,
		AddNEditPropertyComponent,
		KeysPipe,
		ConfirmationDialogComponent,
		ReleaseMetadataSettingsComponent,
		DisplayValuePipe,
		TableTemplateComponent,
		CustomTemplateHostComponent
	],
	exports: [DscribeComponent, ListComponent, DisplayValuePipe],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: DscribeInterceptor, multi: true},
		FilterTreeManipulator
	],
	entryComponents: [
		ListAddNEditDialogComponent,
		ListDeleteDialogComponent,
		AddNEditEntityComponent,
		AddNEditPropertyComponent,
		ConfirmationDialogComponent,
		ReleaseMetadataSettingsComponent,
		AutoCompleteMoreDialogComponent
	]
})
export class DscribeModule {
}
