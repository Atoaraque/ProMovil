import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
})
export class HomeUserPage implements OnInit, AfterViewInit, OnDestroy {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: Product[] = [];
  cartItemCount: number = 0;
  loading: boolean = false;
  searchTerm: string = '';
  showMap: boolean = true; // Variable para mostrar u ocultar el mapa
  deliveryOption: string = 'tienda'; // Ejemplo de opción para mostrar el mapa

  // Map variables
  map: Map | undefined;
  @ViewChild('map', { static: false }) mapContainer!: ElementRef<HTMLElement>;

  ngOnInit() {
    config.apiKey = '5KEdb849wBhOjEi0od3t';
  }

  ionViewWillEnter() {
    this.getAllUsers().subscribe(users => {
      if (users) {
        this.getProductsForUsers(users);
      }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getAllUsers().subscribe(users => {
        if (users) {
          this.getProductsForUsers(users);
        }
      });
      event.target.complete();
    }, 1000);
  }

  openCart() {
    this.utilsSvc.routerLink('main/cart'); // Redirige a la página del carrito
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleQuantityControls(product: Product) {
    product.showQuantityControls = !product.showQuantityControls;
    if (product.showQuantityControls && product.quantity > 0) {
      this.addToCart(product);
    }
  }

  increaseQuantity(product: Product) {
    product.quantity++;
    this.addToCart(product);
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;
      this.addToCart(product);
    }
  }

  addToCart(product: Product) {
    const itemInCart = this.cart.find(item => item.id === product.id);
    if (itemInCart) {
      itemInCart.quantity = product.quantity;
    } else {
      this.cart.push({ ...product });
    }
    this.updateCartItemCount();
  }

  updateCartItemCount() {
    this.cartItemCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  getAllUsers(): Observable<User[]> {
    return this.firebaseSvc.getAllCollectionData<User>('users');
  }

  async getProductsForUsers(users: User[]) {
    this.loading = true;
    this.products = [];

    const productSet = new Set<string>();

    for (const user of users) {
      const path = `users/${user.uid}/products`;

      this.firebaseSvc.getAllCollectionData<Product>(path).subscribe({
        next: (res: Product[]) => {
          res.forEach((product) => {
            if (!productSet.has(product.id)) {
              product.quantity = 0;
              product.showQuantityControls = false;
              this.products.push(product);
              productSet.add(product.id);
            }
          });

          this.filteredProducts = this.products;
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        }
      });
    }
  }

  ngAfterViewInit() {
    this.initializeMap(); // Inicializar el mapa después de que la vista esté lista
  }

  calculateTotalAmount(): string {
    const totalAmount = this.cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    return totalAmount.toFixed(2);
  }

  initializeMap() {
    const initialState = { lng: -74.0555, lat: 4.6726, zoom: 11 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      interactive: false
    });

    // Agregar marcadores
    new Marker({ color: "#FF0000" })
      .setLngLat([-74.0455, 4.7926])
      .addTo(this.map);

    new Marker({ color: "#FF0000" })
      .setLngLat([-74.0155, 4.7526])
      .addTo(this.map);

    new Marker({ color: "#FF0000" })
      .setLngLat([-73.985, 4.8326])
      .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}