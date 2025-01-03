import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/product-list'
  },
  {
    path: 'product-list',
    loadChildren: () => import('./features/products/product-list/product-list.routes').then(m => m.PRODUCT_LIST_ROUTE)
  },
];
