import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-productos-add',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './productos-add.component.html',
  styleUrl: './productos-add.component.scss'
})
export class ProductosAddComponent {

  protected readonly localStorage = localStorage;

  productForm: FormGroup;
  private productoService = inject(ProductoService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required],
      images: ['', Validators.required],
      categoryId: ['', Validators.required]
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
    Swal.fire({
      position: "center",
      icon: "warning",
      iconColor:'#FF0000',
      title: "Tu sesion ha terminado",
      showConfirmButton: false,
      timer: 1200
    });

}

onSubmit(): void {
  if (this.productForm.valid) {
    const productData: any = {
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      categoryId: this.productForm.value.categoryId,
      images: [this.productForm.value.images],
    }
    this.productoService.addProducto(productData).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        Swal.fire({
          title: 'Producto añadido exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigateByUrl('administrador/producto')
        });
      },
      (error) => {
        console.error('Error adding product', error);
        Swal.fire({
          title: 'Error añadiendo producto',
          text: 'Hubo un problema al añadir el producto. Por favor, inténtalo de nuevo.',
          icon: 'error'
        });
      }
    );
  } else {
    console.error('Error adding product');
    Swal.fire({
      title: 'Error al agregar producto',
      text: 'Los campos no pueden estar vacios o pueden estar incorrectos',
      icon: 'error'
    });
  }
}

}
