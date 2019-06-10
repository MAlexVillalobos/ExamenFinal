import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ImagenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagen',
  templateUrl: 'imagen.html',
})
export class ImagenPage {

  imagen;
  arbol = '';
  copa = '';
  tronco = '';
  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore;
  user: firebase.User;
  latitud = 0;
  longitud = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, private geolocation: Geolocation) {
    this.imagen = this.navParams.get('imagen');
    this.storage = firebase.storage();
    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      this.latitud = resp.coords.latitude;
      console.log(resp.coords.longitude);
      this.longitud = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }

  subirImagen(){
    let loading = this.loading.create({
      content: "Subiendo Imagen..."
    });
    loading.present();

    let imagen = {
      arbol: this.arbol,
      copa: this.copa,
      tronco: this.tronco,
      latitud: this.latitud,
      longitud: this.longitud,
      url: '',
      user: this.user.uid
    };

    this.db.collection('imagenes').add(imagen)
    .then(ref => {
      let imagenNombre = ref.id;
      let uploadTask = 
      this.storage.ref('imagenes/' + imagenNombre)
      .putString(this.imagen, 'data_url');

      uploadTask.then( out => {
      loading.dismiss();
      let url = out.downloadURL;
      ref.update({url: url});
      this.navCtrl.pop();
      })
      .catch( error => {
        console.log('error al subir la imagen');
      });
    });
  } 
}