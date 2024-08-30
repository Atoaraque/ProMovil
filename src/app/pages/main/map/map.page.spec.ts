import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { mapPage } from '../map/map.page';

describe('mapPage', () => {
  let component: mapPage;
  let fixture: ComponentFixture<mapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [mapPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(mapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
