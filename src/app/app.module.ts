import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShowDiseasesPage } from '../pages/show-diseases/show-diseases';
import { ShowSymptomsPage } from '../pages/show-symptoms/show-symptoms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowDiseasesPage,
    ShowSymptomsPage   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowDiseasesPage,
    ShowSymptomsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, SQLite
  ]
})
export class AppModule {}
