import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {DSCRIBE_ROUTES} from '../../../src/lib/dscribe-routes';
import {SampleListComponent} from './sample-list/sample-list.component';

const routes: Routes = [
	{path: 'auth-callback', component: AuthCallbackComponent},
	{path: 'sample-list', component: SampleListComponent},
	{path: '', component: AppComponent, canActivate: [AuthGuard], children: DSCRIBE_ROUTES},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
