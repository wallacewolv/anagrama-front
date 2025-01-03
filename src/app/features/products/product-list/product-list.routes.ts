import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';

export const PRODUCT_LIST_ROUTE: Routes = [
  { path: '', component: ProductListComponent },
  {
    path: 'product-dialog',
    loadChildren: () => import('../product-dialog/product-dialog.routes').then(m => m.PRODUCT_DIALOG_ROUTE)
  },
];
