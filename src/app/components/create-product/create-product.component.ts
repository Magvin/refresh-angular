import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private productService: ProductsService,
    private modalService: ModalService
  ) {}

  get title() {
    return this.form.controls.title as FormControl;
  }

  submit() {
    this.productService
      .create({
        title: this.title.value,
        id: 1,
        price: 13.5,
        description: 'some description',
        image: '',
        category: '',
        rating: {
          rate: 32,
          count: 1,
        },
      })
      .subscribe(() => this.modalService.close());
  }
}
