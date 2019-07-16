import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/1',
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
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
