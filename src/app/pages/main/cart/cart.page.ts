import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, AfterViewInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];
  loading: boolean = false;
  totalAmount: number = 0;
  shippingCost: number = 5000; // Ajusta el costo de envío según sea necesario
  ivaPercentage: number = 0.019;
  formValid: boolean = false; // Para controlar si el formulario es válido

  form = new FormGroup({
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ])
  });

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

          this.totalAmount = this.calculateTotalAmount(); // Actualiza el total
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        }
      });
    }
  }

  ngOnDestroy() {
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
                value: this.calculateTotalAmount() + (this.formValid ? this.shippingCost : 0) + this.calculateIVA()
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

  calculateTotalAmount(): number {
    return this.products.reduce((acc, product) => acc + product.price, 0);
  }

  calculateIVA(): number {
    return this.totalAmount * this.ivaPercentage;
  }

  calculateGrandTotal(): number {
    return this.totalAmount + (this.formValid ? this.shippingCost : 0) + this.calculateIVA();
  }

  saveAddress() {
    if (this.form.valid) {
      this.formValid = true;
      this.form.disable(); // Deshabilitar el formulario
      this.calculateGrandTotal(); // Actualizar el total con el costo de envío
    } else {
      alert('Por favor, completa todos los campos del formulario.');
    }
  }
}
