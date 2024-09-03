import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map', { static: false }) mapContainer!: ElementRef<HTMLElement>;

  form = new FormGroup({
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[1-9]\d{1,14}$/)
    ])
  });

  ngOnInit(): void {
    config.apiKey = '5KEdb849wBhOjEi0od3t';
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    const initialState = { lng: -74.0555, lat: 4.6726, zoom: 11 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      interactive: false  // Deshabilita la interacción si es necesario
    });
  
    // Agregar la primera marca
    new Marker({ color: "#FF0000" })
      .setLngLat([-74.0455, 4.7926]) // Coordenadas de la primera ubicación
      .addTo(this.map);
    
    // Agregar la segunda marca
    new Marker({ color: "#FF0000" })
      .setLngLat([-74.0155, 4.8526]) // Coordenadas de la segunda ubicación
      .addTo(this.map);
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      // Handle form submission, e.g., send data to a service
      console.log('Form Data:', formData);
    } else {
      this.form.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
