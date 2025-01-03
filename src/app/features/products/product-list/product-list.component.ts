import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { ProductService } from '../../../core/services/product.service';
import { TypeSelectedEnum } from '../../../shared/enums/type-selected.enum';
import { Product } from '../../../shared/models/product.model';
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
    ProductDialogComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class ProductListComponent implements OnInit {
  dataSource?: Array<Product>;
  columnsToDisplay = ['title', 'category', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Product | null;

  productSelected?: Product;
  typeSelected?: TypeSelectedEnum;

  typeSelectedEnum = TypeSelectedEnum;

  constructor(
    private readonly productService: ProductService,
    public dialog: MatDialog,
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: { title: 'test' } as Product,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editOrViewProduct(product: Product, type: TypeSelectedEnum) {
    this.productSelected = product;
    this.typeSelected = type;
  }
}
