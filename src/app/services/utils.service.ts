import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  getFromLocalStorage(arg0: string): import("../models/user.model").User {
    throw new Error('Method not implemented.');
  }

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  ModalCtrl = inject(ModalController) 
  
async takePicture (promptLabelHeader: string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture: 'Toma una foto'
  });
};

  // Loading //
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  // Toast //
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // Enruta a cualquier pçagina disponible //
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // Guarda un elemento en el almacenamiento local //
  saveInLocalStorage(key: string, value:any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener elemento desde el almacenamiento local //

getFromLocalStorage(key: string, value:any){
  return JSON.parse(localStorage.getItem(key)) 
}
}
