import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './productos-edit.component.html',
  styleUrls: ['./productos-edit.component.scss']
})
export class ProductosEditComponent implements OnInit {
  editForm: FormGroup;
  productId!: number;
  protected readonly localStorage = localStorage;

  parsedImages: any = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required],
      images: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.loadProductData();
      }
    });
  }

  loadProductData(): void {
    this.productoService.getProductById(this.productId).subscribe({
      next: (data) => {
        if (Array.isArray(data.images) && data.images.length > 0) {
          this.parsedImages = data.images[0];
        } else {
          this.parsedImages = '';
        }
        this.editForm.patchValue({
          ...data, 
          images: this.parsedImages 
        });
      }
    });
  }

  getUserName(): string {
    const username = localStorage.getItem('name_user');
    if (username) {
      return username.split('@')[0];
    }
    return 'Usuario';
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['home']);
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const productData = {
        title: this.editForm.value.title,
        price: this.editForm.value.price,
        description: this.editForm.value.description,
        categoryId: this.editForm.value.categoryId,
        images: [this.editForm.value.images],
      };

      this.productoService.updateProducto(this.productId, productData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Producto actualizado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['administrador/producto']);
          });
        },
        (error) => {
          console.error('Error actualizando producto', error);
          Swal.fire({
            title: 'Error actualizando producto',
            text: 'Hubo un problema al actualizar el producto. Por favor, inténtalo de nuevo.',
            icon: 'error'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error al actualizar producto',
        text: 'Los campos no pueden estar vacíos o pueden estar incorrectos',
        icon: 'error'
      });
    }
  }
}
