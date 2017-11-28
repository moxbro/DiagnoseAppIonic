import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

/**
 * Generated class for the ShowDiseasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-diseases',
  templateUrl: 'show-diseases.html',
})
export class ShowDiseasesPage {

  private options = { name: "DbDiagnosis.db", location: 'default', createFromLocation: 1 };
  private queryNames = "SELECT  DiseaseName FROM ChosenSynonymsDiseases;";
  public diseaseNames: String[] = [];
  public chosenSymptoms: String[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql(this.queryNames, {}).then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.diseaseNames.push(rows.item(i).DiseaseName);
          console.log("ShowDiseases-Load: " + JSON.stringify(data));
      })
      //this.names.push(this.names.length.toString());
    });

    //this.navParams.get('chosenSymptoms');

    //Example passing Data through Pages
    //this.db = this.navParams.get('SQLiteObject');
    
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDiseasesPage');
  }

  

}
