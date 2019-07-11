import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  { path: ':id/generator', loadChildren: './generator/generator.module#GeneratorPageModule' },
  { path: 'purchase', loadChildren: './purchase/purchase.module#PurchasePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
