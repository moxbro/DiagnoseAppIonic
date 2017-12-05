import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ShowSymptomsPage } from '../show-symptoms/show-symptoms'

/**
 * Generated class for the AgeSexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-age-sex',
  templateUrl: 'age-sex.html',
})
export class AgeSexPage {

  private options = { name: "DbDiagnosis.db", location: 'default', createFromLocation: 1 };
  private querySex = "INSERT INTO ChosenSynonymsNames (Name, Source) VALUES (?, 1);";
  private queryAge = "INSERT INTO ChosenSynonymsNames (Name, Source) VALUES (?, 1);";
  private myDate: String = new Date().toISOString();
  private isenabled = true;
  private gender = "FEMALE";
  private db;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgeSexPage');
  }

  private goShowSymptoms() {
    this.initAgeSex();
    this.navCtrl.push(ShowSymptomsPage);
  }

  async initAgeSex() {

    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      this.db = db.executeSql(this.querySex, ["'SYMBOL_USER_GENDER_" + this.gender + "'"]).then((data) => {
        console.log("INSERTED:     " + JSON.stringify(data));
        console.log("Gender:       " + "'SYMBOL_USER_GENDER_" + this.gender + "'");
      }, (error) => {
        console.log("Gender:       " + this.gender);
        console.log("Gender ERROR: " + "'SYMBOL_USER_GENDER_" + this.gender + "'"); 
      })
      this.db = db.executeSql(this.queryAge, ["'SYMBOL_USER_AGE_" + this.zeroPad(this.calculateAge(this.myDate),2) + "'"]).then((data) => {
        console.log("INSERTED:  " + JSON.stringify(data));
        console.log("Age ERROR: " + "'SYMBOL_USER_AGE_" + this.zeroPad(this.calculateAge(this.myDate),2) + "'"); 
      }, (error) => {
        console.log("Age ERROR: " + JSON.stringify(error.err)); 
        console.log("myDate:    " + this.myDate.toString());
        console.log("Age ERROR: " + "'SYMBOL_USER_AGE_" + this.zeroPad(this.calculateAge(this.myDate),2) + "'"); 
      })
    });
  }

  private zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  private calculateAge(birthday) { 
    var ageDifMs = Date.now() - Date.parse(birthday);
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

}
