import {Component, OnInit, inject} from '@angular/core';
import {ProductoService} from '../../../../services/producto.service';
import {ProductoInterface} from '../../../../interfaces/producto-interface';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterOutlet,
    RouterLink, CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})

export class ProductosComponent implements OnInit {
  searchForm: FormGroup;
  filteredProductos: ProductoInterface[] = [];
  protected readonly localStorage = localStorage;

  private readonly _producto = inject(ProductoService);

  productos: ProductoInterface[] = [];
  allProductos: ProductoInterface[] = [];

  constructor(
    private productService: ProductoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({
      search: []
    });

  }

  ngOnInit(): void {
    this.getDataProduct();
  }

  getDataProduct(): void {
    this._producto.getAllProduct().subscribe(
      (res: ProductoInterface[]) => {
        this.productos = res;
        res.forEach(
          (item: any) => {
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
              console.log(item)
            }
          }
        )
      }
    )
  }

  toggleDescription(productId: number): void {
    this.productos = this.productos.map(product =>
      product.id === productId ? {...product, showDescription: !product.description} : product
    );
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
  searchProduct(): void {
    const searchValue = this.searchForm.get('search')?.value;
    if (searchValue) {
      this._producto.searchProductsByName(searchValue).subscribe(
        (res: ProductoInterface[]) => {
          if(res.length>0){

            this.productos = res;
            res.forEach(
              (item: any) => {
                if (item.images[0].startsWith('["')) {
                  item.images = JSON.parse(item.images);
                  console.log(item)
                }
              }
            )
            console.log(res)
          }else{
            Swal.fire({
              position: "center",
              icon: "warning",
              iconColor:'#FF0000',
              title: "No se encontraron productos para la busqueda.",
              showConfirmButton: false,
              timer: 1200
            });
          }

        },

        (error) => {
          console.error('Error al buscar productos', error);
          Swal.fire({
            position: "center",
            icon: "warning",
            iconColor:'#FF0000',
            title: "Error al hacer la busqueda.",
            showConfirmButton: false,
            timer: 1200
          });
          this.getDataProduct();

        }
      );
    }else{
      Swal.fire({
        position: "center",
        icon: "warning",
        iconColor:'#FF0000',
        title: "Entrada errornea o vacia",
        showConfirmButton: false,
        timer: 1200
      });

      this.getDataProduct();


    }
  }

  getUserName(): string {
    const username = localStorage.getItem('name_user');
    if (username) {
      return username.split('@')[0];
    }
    return 'Usuario';
  }

  deleteProducto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      iconColor:'#FF0000',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProducto(id).subscribe({
            next: () => {
              this.getDataProduct();
            }, error: (error) => {
              console.error('Ocurrio un error al eliminar el producto')
            }
          }
        );
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success',
        );
      }
    });
  }
}
