import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowDiseasesPage } from './show-diseases';

@NgModule({
  declarations: [
    ShowDiseasesPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowDiseasesPage),
  ],
})
export class ShowDiseasesPageModule {}
