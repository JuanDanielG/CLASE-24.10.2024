import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-unico',
  standalone: true,
  imports: [],
  templateUrl: './productos-unico.component.html',
  styleUrl: './productos-unico.component.css'
})
export class ProductosUnicoComponent {
  idProducto = input.required<number>({alias: 'id'}) //
  public route = inject(ActivatedRoute);
  idProductoAntiguo = '';

  ngOnInit(){
    this.idProductoAntiguo = this.route.snapshot.params?.["id"]
  }
}
