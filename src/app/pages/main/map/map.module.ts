import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from '../map/map.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { mapPageRoutingModule } from './map-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    mapPageRoutingModule,
    SharedModule
  ],
  declarations: [MapPage]
})
export class mapPageModule {}

