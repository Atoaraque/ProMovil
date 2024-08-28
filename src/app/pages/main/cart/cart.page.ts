import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public menucontroler: MenuController, public firebaseService: FirebaseService) {
  }
  ngOnInit() {}

  openMenu() {
  console.log('open menu');
  this.menucontroler.toggle('principal');
  }

}

