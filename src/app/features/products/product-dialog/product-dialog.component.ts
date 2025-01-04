import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProductService } from '../../../core/services/product.service';
import { TypeSelectedEnum } from '../../../shared/enums/type-selected.enum';
import { ProductDialogDataInterface } from '../../../shared/models/product.model';

interface ProductSelectValues {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
})
export class ProductDialogComponent {
  productCategories: Array<ProductSelectValues> = [
    { value: `men's clothing`, viewValue: `men's clothing` },
    { value: `jewelery`, viewValue: `jewelery` },
    { value: `electronics`, viewValue: `electronics` },
    { value: `women's clothing`, viewValue: `women's clothing` },
  ];

  get isTypeToEqualEdit() {
    return this.data.type === TypeSelectedEnum.EDIT;
  }

  constructor(
    private readonly productService: ProductService,
    public readonly dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogDataInterface,
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  updateProduct() {
    this.productService.updateProduct(this.data.product).subscribe(({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.error(error);
      }
    }));
  }
}
