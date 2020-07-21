import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from '@auth-layout/layout/sign-in-page/sign-in-page.component';
import { AuthGuard } from '@core/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-layout/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in', component: SignInPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
