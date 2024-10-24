import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosUnicoComponent } from './productos-unico.component';

describe('ProductosUnicoComponent', () => {
  let component: ProductosUnicoComponent;
  let fixture: ComponentFixture<ProductosUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosUnicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
