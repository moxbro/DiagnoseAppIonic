import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the ShowSymptomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-symptoms',
  templateUrl: 'show-symptoms.html',
})
export class ShowSymptomsPage {
  private options = { name: "DbDiagnosis.db", location: 'default', createFromLocation: 1 };
  private queryNames = "SELECT Name FROM Synonyms";
  public names: String[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql(this.queryNames, {}).then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.names.push(rows.item(i).Name);
        console.log("Number of Synonyms on database = " + this.names.length);
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSymptomsPage');
  }

  public typing($value){
    this.names[0] = $value;
  }

}
