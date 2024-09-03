import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages: { title: string; url: string; icon: string }[] = [];
  
  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    });

    // Validar y redirigir según el rol del usuario al cargar la página
    const user = this.user();
    if (user) {
      this.initializePages(user.role);
    }
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  // Cerrar sesión //
  signOut() {
    this.firebaseSvc.signOut();
  }

  // Inicializar las páginas con la URL correcta según el rol
  initializePages(role: string) {
    if (role === 'vendedor') {
      this.pages = [
        { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
        { title: 'Perfil', url: '/main/profile', icon: 'person-outline' }
      ];
    } else if (role === 'comprador') {
      this.pages = [
        { title: 'Inicio', url: '/main/home-user', icon: 'home-outline' },
        { title: 'Perfil', url: '/main/profile', icon: 'person-outline' }
      ];
    }
  }

  // Navegar a la página seleccionada
  navigateTo(page: { title: string; url: string; icon: string }) {
    if (page.url) {
      this.router.navigateByUrl(page.url);
    } else {
      console.error('No se ha definido una URL para esta página.');
    }
  }
}
