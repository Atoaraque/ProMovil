import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl('', [Validators.required]),
    
  })

  firebaseSvc = inject(FirebaseService)

  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
  if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      const res = await this.firebaseSvc.signUp(this.form.value as User);
      await this.firebaseSvc.updateUser(this.form.value.name);

      let uid = res.user.uid;
      this.form.controls.uid.setValue(uid);

      await this.setUserInfo(uid);

      // Obtener el rol seleccionado
      const selectedRole = this.form.controls.role.value;

      // Redirigir según el rol
      if (selectedRole === 'comprador') {
        this.utilsSvc.routerLink('main/cart'); // Redirige a Cart si es comprador
      } else if (selectedRole === 'vendedor') {
        this.utilsSvc.routerLink('main/home'); // Redirige a Home si es vendedor
      }

    } catch (error) {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    }
  }
}
  
  


  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('main/home');
        this.form.reset();
        
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
          loading.dismiss();
        }

      )


    }
  }
  
}
