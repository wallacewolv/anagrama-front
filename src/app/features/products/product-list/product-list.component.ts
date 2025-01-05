import { animate, state, style, transition, trigger } from '@angular/animations';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AlertService } from '../../../core/services/alert.service';
import { ProductService } from '../../../core/services/product.service';
import { TypeSelectedEnum } from '../../../shared/enums/type-selected.enum';
import { Product, ProductDialogDataInterface, ProductSelectValues } from '../../../shared/models/product.model';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-list',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TruncatePipe,
    CapitalizePipe,
    CurrencyPipe,
    ProductDialogComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    CapitalizePipe,
  ]
})
export class ProductListComponent implements OnInit {
  dataSource?: Array<Product>;
  columnsToDisplay = ['title', 'category', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Product | null;
  productCategories?: Array<ProductSelectValues>;

  get viewType() {
    return TypeSelectedEnum.VIEW;
  }

  get editType() {
    return TypeSelectedEnum.EDIT;
  }

  constructor(
    private readonly productService: ProductService,
    private readonly capitalizePipe: CapitalizePipe,
    private readonly alertService: AlertService,
    public readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        for (let i = 0; i < response.length; i++) {
          response[i].category = this.capitalizePipe.transform(response[i].category);
        }

        this.dataSource = response;
        this.productCategories = this.changeCategories(response);

        this.alertService.sendingSuccessAlert('Products loaded successfully!');
      },
      error: (error) => {
        this.alertService.sendingErrorAlert('Error loading products!');
      }
    });
  }

  changeCategories(products: Array<Product>): Array<ProductSelectValues> {
    const categories = products.map(({ category }) => ({ value: category, viewValue: this.capitalizePipe.transform(category) }));

    return categories.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.value === item.value && t.viewValue === item.viewValue),
    );
  }

  openDialog(product: Product, type: TypeSelectedEnum) {
    this.dialog.open(ProductDialogComponent, {
      data: {
        product,
        type,
        categories: this.productCategories,
      } as ProductDialogDataInterface,
      height: '400px',
      width: '600px',
    });
  }
}
