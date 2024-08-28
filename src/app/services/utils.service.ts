import { inject, Injectable } from '@angular/core';
import { IonModal, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  getFromLocalStorage(arg0: string): import("../models/user.model").User {
    throw new Error('Method not implemented.');
  }

  loadingCtrl = inject (LoadingController);
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
    return this.loadingCtrl.create( {spinner: 'crescent'} );
  }

  // Toast //
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // Modal //
  async presentModal (opts: ModalOptions) {
    const modal = await this.ModalCtrl.create(opts); 
    await modal.present();

  const {data} = await modal.onWillDismiss(); 
  if (data) return data;
  }

  dismissModal (data?: any) {
  return this.ModalCtrl.dismiss(data);
  }
} 