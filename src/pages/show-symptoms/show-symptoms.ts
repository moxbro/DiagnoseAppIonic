import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ShowDiseasesPage } from '../show-diseases/show-diseases'

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
  private querySynonyms = "SELECT Name FROM TargetSynonymsVisible";
  private queryChosenSymptoms = "SELECT Name FROM ChosenSynonymsNamesVisible;";
  public names: String[] = [];
  public namesShown: String[] = [];
  public values: String[] = [];
  public value;
  public chosenSymptoms: String[] = [];
  private searchQuery: string = null;
  public db;
  private isenabled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      this.db = db.executeSql(this.querySynonyms, {}).then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.names.push(rows.item(i).Name);
        console.log("Number of Synonyms on database = " + this.names.length);
      })
    });

    this.loadChosenSymptoms();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSymptomsPage');
  }

  async loadChosenSymptoms() {
    let db = await this.sqlite.create(this.options);
    // Get already ChosenSymptoms
    await db.executeSql(this.queryChosenSymptoms, {}).then((data) => {
      let rows = data.rows;
      for (let i = 0; i < rows.length; i++)
        this.chosenSymptoms.push(rows.item(i).Name);
      console.log("Number of Chosen Symptoms = " + this.chosenSymptoms.length);
    });
    //Button Check
    if (this.chosenSymptoms.length == 0) {
      this.isenabled = false;
    } else {
      this.isenabled = true;
    }
  }

  public typing($value) {
    //this.names[0] = $value;
    //this.names = this.names.filter($value);
    this.namesShown = this.names.filter((s: String) => s.match(new RegExp($value, "i")));
  }

  public ListItemClick($value) {
    this.chosenSymptoms.push($value);

    //Deleting selected item in names
    var index = this.names.indexOf($value);
    if (index !== -1) {
      this.names.splice(index, 1);
    }

    //clearing searchQuery
    this.namesShown = [];
    this.searchQuery = "";

    this.isenabled = true;
  }

  async deleteChosenSymptom($value) {
    //deleting ChosenSymptom
    var index = this.chosenSymptoms.indexOf($value);
    if (index !== -1) {
      this.chosenSymptoms.splice(index, 1);
    }
    //adding deleted item back to the List 'names'
    this.names.push($value);

    //deleting Chosen Symptoms DB
    let db = await this.sqlite.create(this.options);
    await db.executeSql("DELETE FROM ChosenSynonymsNames WHERE Name == (?);", [$value]).then((data) => {
      console.log("Symptom " + $value + " deleted");
    }, (error) => {
      console.log("Delete Symptom ERROR: " + JSON.stringify(error.err));
      console.log($value);
    });

    //Button Check
    if (this.chosenSymptoms.length == 0) {
      this.isenabled = false;
    } else {
      this.isenabled = true;
    }
  }

  async dbReset() {
    let db = await this.sqlite.create(this.options);
    //DB Reset
    await db.executeSql("INSERT INTO Actions (Command) VALUES ('DATABASE_RESET');", []).then((data) => {
      console.log("Reset: " + JSON.stringify(data));
    }, (error) => {
      console.log("Reset ERROR: " + JSON.stringify(error.err));
    });
  }

  async initAgeSex() {
    let db = await this.sqlite.create(this.options);
    //Age+Sex
    await db.executeSql("INSERT INTO ChosenSynonymsNames (Name, Source) VALUES ('SYMBOL_USER_GENDER_FEMALE', 1);", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
      console.log("Gender ERROR: " + JSON.stringify(error.err));
    });

    await db.executeSql("INSERT INTO ChosenSynonymsNames (Name, Source) VALUES ('SYMBOL_USER_AGE_07', 1);", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
      console.log("Age ERROR: " + JSON.stringify(error.err));
    });
  }

  async configDB() {
    let db = await this.sqlite.create(this.options);
    //Database Config
    await db.executeSql("SELECT Value FROM Parameters WHERE Key = 'DatabasePragma';", []).then((data) => {
      let rows = data.rows;
      this.value = rows.item(0).Value;
      console.log("GetValue = " + this.value);
    });

    this.values = this.value.split(";");
    for (let i = 0; i < this.values.length; i++) {
      await db.executeSql(this.values[i] + ";", []).then((data) => {
        console.log(this.values[i]);
        console.log("Value INSERTED: " + JSON.stringify(data));
      }, (error) => {
        console.log(this.values[i]);
        console.log("Value ERROR: " + JSON.stringify(error.err));
      });
    }
  }

  async getDiagnos() {
    let db = await this.sqlite.create(this.options);
    //Adding Symptom
    for (let i = 0; i < this.chosenSymptoms.length; i++) {
      await db.executeSql("INSERT INTO ChosenSynonymsNames (Name, Source) VALUES (?,?);", [this.chosenSymptoms[i], 2]).then((data) => {
        console.log("INSERTED: " + this.chosenSymptoms[i] + JSON.stringify(data));
      }, (error) => {
        console.log("Symptom ERROR: " + this.chosenSymptoms[i] + JSON.stringify(error.err));
      });
    }
    //Goto Diagnos
    this.navCtrl.push(ShowDiseasesPage);
    //this.navCtrl.push(ShowDiseasesPage, {chosenSymptoms: this.chosenSymptoms});
  }

}
