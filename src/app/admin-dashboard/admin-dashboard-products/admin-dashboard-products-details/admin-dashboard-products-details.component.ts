import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../shared/models/category.interface';
import { ProductDetailsService } from '../../../product-details/product-details.service';
import { InitializationService } from '../../../shared/services/initialization/initialization.service';
import { ProductCreate } from '../../../shared/models/product.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-products-details',
  templateUrl: './admin-dashboard-products-details.component.html',
  styleUrls: ['./admin-dashboard-products-details.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class AdminDashboardProductsDetailsComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    oldPrice: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
    category: new FormControl<Category | null>(null),
    trending: new FormControl(false, {
      nonNullable: true,
    }),
    mainImage: new FormControl('', [Validators.required]),
    mainImageFile: new FormControl(),
    cardImage: new FormControl('', [Validators.required]),
    cardImageFile: new FormControl(),
    cardHoverImage: new FormControl('', [Validators.required]),
    cardHoverImageFile: new FormControl(),
  });
  public isEditMode = false;
  public categories: Category[] = [];
  private id = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productDetailsService: ProductDetailsService,
    private initializationService: InitializationService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.productDetailsService.getProductDetails(id).subscribe(p => {
        this.form.patchValue({
          ...p,
        });
        this.isEditMode = true;
        this.id = id;
      });
    });
    this.initializationService.getAllCategories().subscribe(c => {
      this.categories = c;
      this.form.controls.category.setValue(c[0]);
    });
  }

  public onSubmit(): void {
    if (!this.form.valid || !this.form.controls.category.value) return;

    const product: ProductCreate = {
      name: this.form.controls.name.value,
      price: this.form.controls.price.value,
      oldPrice: this.form.controls.oldPrice.value,
      trending: this.form.controls.trending.value,
      description: this.form.controls.description.value,
      category: this.form.controls.category.value._id,
      mainImage: this.form.controls.mainImageFile.value,
      cardImage: this.form.controls.cardImageFile.value,
      cardHoverImage: this.form.controls.cardHoverImageFile.value,
    };
    const request$ = this.isEditMode
      ? this.productDetailsService.createOrUpdateProduct(product, this.id)
      : this.productDetailsService.createOrUpdateProduct(product);
    request$.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
    });
  }

  public onFileChange(event: Event, formControlName: string) {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.form.get(formControlName)?.setValue(file);
    }
  }

  public displayInvalidFeedback(controlKey: string): boolean {
    const control = this.form.get(controlKey);
    return (control?.invalid && control?.touched) || false;
  }
}
