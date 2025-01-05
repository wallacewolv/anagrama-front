import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AlertService } from '../../../core/services/alert.service';
import { ProductService } from '../../../core/services/product.service';
import { TypeSelectedEnum } from '../../../shared/enums/type-selected.enum';
import { ProductDialogDataInterface } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
export class ProductDialogComponent implements AfterViewInit {
  productForm?: UntypedFormGroup;

  get isTypeToEqualEdit() {
    return this.data.type === TypeSelectedEnum.EDIT;
  }

  constructor(
    private readonly productService: ProductService,
    private readonly alertService: AlertService,
    private formBuilder: FormBuilder,
    public readonly dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogDataInterface,
  ) { }

  ngAfterViewInit() {
    if (!this.data.product) return;

    this.productForm = this.formBuilder.group({
      id: this.validatorFormControlDisabled(this.data.product.id),
      title: this.validatorFormControlDisabled(this.data.product.title),
      price: this.validatorFormControlDisabled(this.data.product.price),
      description: this.validatorFormControlDisabled(this.data.product.description),
      category: this.validatorFormControlDisabled(this.data.product.category),
      image: this.validatorFormControlDisabled(this.data.product.image),
      rating: this.formBuilder.group({
        rate: this.validatorFormControlDisabled(this.data.product.rating.rate),
        count: this.validatorFormControlDisabled(this.data.product.rating.count),
      }),
    });
  }

  validatorFormControlDisabled(value: any) {
    return this.formBuilder.control({ value, disabled: !this.isTypeToEqualEdit });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  updateProduct() {
    const product = this.productForm?.getRawValue();
    this.productService.updateProduct(product).subscribe(({
      next: () => {
        this.dialogRef.close();
        this.alertService.sendingSuccessAlert('Product updated successfully!');
      },
      error: (error) => {
        this.alertService.sendingErrorAlert('Error updating product!');
      }
    }));
  }
}
