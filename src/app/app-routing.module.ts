import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/3',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: ':id/generator',
    canActivate: [AuthGuard],
    loadChildren: './generator/generator.module#GeneratorPageModule'
  },
  {
    path: 'purchase',
    canActivate: [AuthGuard],
    loadChildren: './purchase/purchase.module#PurchasePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'verify-user/:email', loadChildren: './verify-user/verify-user.module#VerifyUserPageModule' },
  { path: 'verify-email/:email/:code', loadChildren: './verification/verification.module#VerificationPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
