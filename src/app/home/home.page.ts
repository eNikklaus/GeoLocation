import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lat:number
  lon:number
  total:string
  busqueda : string = '';
  results: Observable<any>;

  
  constructor(public navCtrl: NavController, public geolocation:Geolocation) {
    this.getGeolocation()
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      
    });
  }

  cambio(){
    if(this.busqueda==="Madrid"){
      let latMadrid = 40.4167;
      let lonMadrid = -3.70325;
      this.total = this.calculateDistance(this.lon, lonMadrid, this.lat, latMadrid)+" KM";
    }
    else if(this.busqueda==="Mexico"){
      let latMex = 35.4167;
      let lonMex = -10.70325;
      this.total = this.calculateDistance(this.lon, lonMex, this.lat, latMex)+" KM";
    }
    else{
      this.total = "";
    }
    
  }

  calculateDistance(lon1, lon2, lat1, lat2){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return Math.trunc(dis);
  }

}
