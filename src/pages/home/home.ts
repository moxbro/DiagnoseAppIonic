import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ShowDiseasesPage } from '../show-diseases/show-diseases'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private options = { name: "DbDiagnosis.db", location: 'default', createFromLocation: 1 };
  private queryNames = "SELECT Name FROM Synonyms";
  public names: String[] = [];

  constructor(public navCtrl: NavController, private sqlite: SQLite, private alertController: AlertController) {
    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql(this.queryNames, {}).then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.names.push(rows.item(i).Name);
        console.log("Number of Synonyms on database = " + this.names.length);
      })
    });
    /*this.accessDB();*/
  }

  /*async accessDB() {
  let db = await this.sqlite.create(this.options);
  let data = await db.executeSql(this.queryNames, {});
  let rows = data.rows;
  for (let i = 0; i < rows.length; i++)
    this.names.push(rows.item(i).name + " async/await");
}*/

  public nextPage() {
    //Example passing Data through Pages
    //this.navCtrl.push(ShowDiseasesPage, {SQLiteObject: this.sqlite});
    this.navCtrl.push(ShowDiseasesPage);
  }

  public ListItemClick() {
    let alert = this.alertController.create({
      title: 'Example',
      subTitle: 'Example subtitle',
      buttons: ['OK']
    });
    alert.present();
  }


}


