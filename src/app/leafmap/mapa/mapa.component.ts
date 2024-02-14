import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  title = 'mapa';
  private map!: L.Map
  municipalitiesVisible = false;
  banquetasVisible = false;
  markers: L.Marker[] = [
    L.marker([17.036832, -96.712819]), // Amman
    L.marker([17.036832, -96.712819])

  ];

  private municipalitiesLayer: L.GeoJSON | undefined;
  private banquetasLayer: L.GeoJSON | undefined


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }


  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
    var cities = L.layerGroup([littleton, denver, aurora, golden]);
    this.map = L.map('map', {
      zoom: 10,
      layers: [
        cities
      ]
    });

    L.tileLayer(baseMapURl).addTo(this.map);

    var overlayMaps = {
      "Cities": cities
    };

    var layerControl = L.control.layers(overlayMaps).addTo(this.map);

    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
    });
    var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.'),
      rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');

    var parks = L.layerGroup([crownHill, rubyHill]);
    layerControl.addBaseLayer(openTopoMap, "OpenTopoMap");
    // if (this.municipalitiesVisible) {
    //   this.http.get("assets/100MUNICIPIOS_INPLABIEN.geojson").subscribe((json: any) => {
    //     const layer = L.geoJSON(json);
    //     layerControl.addOverlay(layer, "Municipalities");
    //   });
    // }
    this.http.get("assets/100MUNICIPIOS_INPLABIEN.geojson").subscribe((json: any) => {
      const layer = L.geoJSON(json);
      layerControl.addOverlay(layer, "Municipalities");
    });
    // if (this.banquetasVisible) {
    //   this.http.get("assets/INV_Oaxaca_Inegi.geojson").subscribe((json: any) => {
    //     const layer = L.geoJSON(json);
    //     layerControl.addOverlay(layer, "Banquetas");
    //   });
    // }
    this.http.get("assets/INV_Oaxaca_Inegi.geojson").subscribe((json: any) => {
      const layer = L.geoJSON(json);
      layerControl.addOverlay(layer, "Banquetas");
    });
  }


  private addMarkers() {
    // Add your markers to the map
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }

  toggleMunicipalitiesVisibility() {
    //this.municipalitiesVisible = !this.municipalitiesVisible;
    if (this.municipalitiesVisible) {
      this.addMunicipalitiesLayer();
    } else {
      this.removeMunicipalitiesLayer();
    }
  }
  
  toggleBanquetasVisibility() {
    //this.banquetasVisible = !this.banquetasVisible;
    if (this.banquetasVisible) {
      this.addBanquetasLayer();
    } else {
      this.removeBanquetasLayer();
    }
  }
  

  private addMunicipalitiesLayer() {
    //var layerControl = L.control.layers().addTo(this.map);
    this.http.get("assets/100MUNICIPIOS_INPLABIEN.geojson").subscribe((json: any) => {
      this.municipalitiesLayer = L.geoJSON(json);
      if (this.municipalitiesVisible) {
        this.municipalitiesLayer.addTo(this.map);
      }
      //layerControl.addOverlay(this.municipalitiesLayer, "Municipalities");
    });
  }
  
  private addBanquetasLayer() {
    //var layerControl = L.control.layers().addTo(this.map);
    this.http.get("assets/INV_Oaxaca_Inegi.geojson").subscribe((json: any) => {
      this.banquetasLayer = L.geoJSON(json);
      if (this.banquetasVisible) {
        this.banquetasLayer.addTo(this.map);
      }
      //layerControl.addOverlay(this.banquetasLayer, "Banquetas");
    });
  }
  
  private removeMunicipalitiesLayer() {
    //var layerControl = L.control.layers().addTo(this.map);
    if (this.municipalitiesLayer) {
      this.map.removeLayer(this.municipalitiesLayer);
      //layerControl.removeLayer(this.municipalitiesLayer);
      
    }
  }
  
  private removeBanquetasLayer() {
    //var layerControl = L.control.layers().addTo(this.map);
    if (this.banquetasLayer) {
      this.map.removeLayer(this.banquetasLayer);
      //layerControl.removeLayer(this.banquetasLayer);

    }
  }
}
