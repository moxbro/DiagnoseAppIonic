import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowSymptomsPage } from './show-symptoms';

@NgModule({
  declarations: [
    ShowSymptomsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowSymptomsPage),
  ],
})
export class ShowSymptomsPageModule {}
