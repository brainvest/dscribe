import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AddNEditComponent } from './add-n-edit/add-n-edit.component';
import { AddNEditEntityTypeComponent } from './administration/add-n-edit-entity/add-n-edit-entity-type.component';
import { AddNEditPropertyComponent } from './administration/add-n-edit-property/add-n-edit-property.component';
import { EntityTypeGeneralUsageNamePipe } from './administration/helpers/entity-type-general-usage-name.pipe';
import { EntityHistoryComponent } from './administration/history/entity-history/entity-history.component';
import { PropertyHistoryComponent } from './administration/history/property-history/property-history.component';
import { MetadataManagementComponent } from './administration/metadata-management/metadata-management.component';
import { ReleaseMetadataSettingsComponent } from './administration/release-metadata-settings/release-metadata-settings.component';
import { AddNEditAppInstanceComponent } from './administration/settings/add-n-edit-app-instance/add-n-edit-app-instancecomponent';
import { AddNEditAppTypeComponent } from './administration/settings/add-n-edit-app-type/add-n-edit-app-type.component';
import { AppInstanceManagementComponent } from './administration/settings/app-instance-management/app-instance-management.component';
import { AppTypeManagementComponent } from './administration/settings/app-type-management/app-type-management.component';
import { SettingsComponent } from './administration/settings/settings.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { DisplayValuePipe } from './common/display-value-pipe';
import { DscribeInterceptor } from './common/dscribe-interceptor';
import { SnackBarService } from './common/notifications/snackbar.service';
import { CommandButtonComponent } from './common/command-button/command-button.component';
import { ArithmeticFilterNodeComponent } from './filtering/components/arithmetic-filter-node/arithmetic-filter-node.component';
import { ComparisonFilterNodeComponent } from './filtering/components/comparison-filter-node/comparison-filter-node.component';
import { ConstantFilterNodeComponent } from './filtering/components/constant-filter-node/constant-filter-node.component';
import { FilterNodeComponent } from './filtering/components/filter-node/filter-node.component';
import { LambdaFilterNodeComponent } from './filtering/components/lambda-filter-node/lambda-filter-node.component';
import { LogicalFilterNodeComponent } from './filtering/components/logical-filter-node/logical-filter-node.component';
import { NavigationListFilterNodeComponent } from './filtering/components/navigation-list-filter-node/navigation-list-filter-node.component';
import { PropertyFilterNodeComponent } from './filtering/components/property-filter-node/property-filter-node.component';
import { FilterTreeManipulator } from './filtering/models/filter-tree-manipulator';
import { KeysPipe } from './helpers/keys.pipe';
import { DataHistoryComponent } from './list/data-history/data-history.component';
import { ListAddNEditDialogComponent } from './list/list-add-n-edit-dialog/list-add-n-edit-dialog.component';
import { ListDeleteDialogComponent } from './list/list-delete-dialog/list-delete-dialog.component';
import { CustomTemplateHostComponent } from './list/list-templating/custom-template-host/custom-template-host.component';
import { TableTemplateComponent } from './list/list-templating/table-template/table-template.component';
import { ListComponent } from './list/list/list.component';
import { ListContainerComponent } from './list/list-container/list-container.component';
import { AttachmentsListComponent } from './lob-tools/attachments/attachments-list/attachments-list.component';
import { CommentsListComponent } from './lob-tools/comments/comments-list/comments-list.component';
import { ReportsListComponent } from './lob-tools/reporting/reports-list/reports-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BoolEditorComponent } from './property-editors/bool-editor.component';
import { DateEditorComponent } from './property-editors/date-editor.component';
import { DatetimeEditorComponent } from './property-editors/datetime-editor.component';
import { AutoCompleteMoreDialogComponent, EntityAutoCompleteComponent } from './property-editors/entity-auto-complete.component';
import { EntityListEditorComponent } from './property-editors/entity-list-editor.component';
import { EntitySelectComponent } from './property-editors/entity-select.component';
import { NumberEditorComponent } from './property-editors/number-editor.component';
import { PropertyEditorComponent } from './property-editors/property-editor.component';
import { TextEditorComponent } from './property-editors/text-editor.component';
import { UsersAndRolesManagementComponent } from './security/components/users-and-roles-management/users-and-roles-management.component';
import { DscribeComponent } from './dscribe.component';

@NgModule({
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSelectModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule
	],
	declarations: [
		ArithmeticFilterNodeComponent,
		AttachmentsListComponent,
		AutoCompleteMoreDialogComponent,
		AddNEditAppInstanceComponent,
		AddNEditAppTypeComponent,
		AddNEditComponent,
		AddNEditEntityTypeComponent,
		AddNEditPropertyComponent,
		AppInstanceManagementComponent,
		AppTypeManagementComponent,
		BoolEditorComponent,
		CommentsListComponent,
		ComparisonFilterNodeComponent,
		ConfirmationDialogComponent,
		ConstantFilterNodeComponent,
		CustomTemplateHostComponent,
		DataHistoryComponent,
		DateEditorComponent,
		DatetimeEditorComponent,
		DisplayValuePipe,
		DscribeComponent,
		EntityAutoCompleteComponent,
		EntityHistoryComponent,
		EntityListEditorComponent,
		EntitySelectComponent,
		EntityTypeGeneralUsageNamePipe,
		FilterNodeComponent,
		KeysPipe,
		LambdaFilterNodeComponent,
		ListAddNEditDialogComponent,
		ListComponent,
		ListContainerComponent,
		ListDeleteDialogComponent,
		LogicalFilterNodeComponent,
		MetadataManagementComponent,
		NavigationComponent,
		NavigationListFilterNodeComponent,
		NumberEditorComponent,
		PropertyEditorComponent,
		PropertyFilterNodeComponent,
		PropertyHistoryComponent,
		ReleaseMetadataSettingsComponent,
		ReportsListComponent,
		SettingsComponent,
		TableTemplateComponent,
		TextEditorComponent,
		UsersAndRolesManagementComponent,
		CommandButtonComponent
	],
	exports: [DscribeComponent, ListComponent, DisplayValuePipe, ConfirmationDialogComponent],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: DscribeInterceptor, multi: true },
		FilterTreeManipulator,
		SnackBarService
	]
})
export class DscribeModule {
}
