import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';
export const config = {
  apiKey: "AIzaSyBJeSkv1WPKmBEC4ced6Jt8XZPEGchUU04",
  authDomain: "proyecto-final-607a7.firebaseapp.com",
  databaseURL: "https://proyecto-final-607a7.firebaseio.com",
  projectId: "proyecto-final-607a7",
  storageBucket: "proyecto-final-607a7.appspot.com",
  messagingSenderId: "13408293474",
  appId: "1:13408293474:web:951d34425b7d3e9b"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

