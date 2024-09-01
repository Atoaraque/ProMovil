import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mapPage } from '../map/map.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { mapPageRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    mapPageRoutingModule
  ],
  declarations: [mapPage]
})
export class mapPageModule {}

