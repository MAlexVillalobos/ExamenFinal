import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/auth';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  home = HomePage;
  registro = RegistroPage;
  email = '';
  password = '';
  auth: firebase.auth.Auth;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.auth = firebase.auth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log(this.email, this.password);
    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(data => {
      this.navCtrl.setRoot(this.home);
    })
    .catch(error => {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: error.message,
        buttons: ['Ok']
      });
      alert.present();
    });
  }

  signin(){
    this.navCtrl.push(this.registro);
  }

}