import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ShowSymptomsPage } from '../pages/show-symptoms/show-symptoms'
import { ShowDiseasesPage } from '../pages/show-diseases/show-diseases'
import { AgeSexPage } from '../pages/age-sex/age-sex'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AgeSexPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

