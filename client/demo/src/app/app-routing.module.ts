import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthCallbackComponent} from './auth/auth-callback/auth-callback.component';
import {DscribeComponent} from '../../../src/lib/dscribe.component';

const routes: Routes = [
	{path: 'auth-callback', component: AuthCallbackComponent},
	{path: '', component: AppComponent, canActivate: [AuthGuard], children: DscribeComponent.DSCRIBE_ROUTES},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
