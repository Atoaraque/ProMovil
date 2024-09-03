import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.page.html',
  styleUrls: ['./home-user.page.scss'],
})
export class HomeUserPage implements OnInit, AfterViewInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];
  loading: boolean = false;

  ngOnInit() {
    // Inicialización si es necesaria
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

  // Obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.firebaseSvc.getAllCollectionData<User>('users');
  }

  // Obtener productos de todos los usuarios
  async getProductsForUsers(users: User[]) {
    this.loading = true;
    this.products = []; // Limpiar productos anteriores

    // Usar un Set para evitar duplicados
    const productSet = new Set<string>();

    for (const user of users) {
      const path = `users/${user.uid}/products`;

      this.firebaseSvc.getAllCollectionData<Product>(path).subscribe({
        next: (res: Product[]) => {
          res.forEach((product) => {
            if (!productSet.has(product.id)) {
              this.products.push(product);
              productSet.add(product.id);
            }
          });

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
    this.loadPayPalButton();
  }

  loadPayPalButton() {
    if (window['paypal'] !== undefined) {
      window['paypal'].Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.calculateTotalAmount()
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Aquí puedes realizar acciones adicionales después de la transacción
          });
        },
        onError: (err) => {
          console.error(err);
          // Manejo de errores
        }
      }).render('#paypal-button-container');
    }
  }

  calculateTotalAmount(): string {
    // Implementa la lógica para calcular el total basado en los productos en el carrito
    const totalAmount = this.products.reduce((acc, product) => acc + product.price, 0);
    return totalAmount.toFixed(2); // Asegúrate de que el formato sea compatible con PayPal
  }
}
