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
  private queryNames = "SELECT  DiseaseName, DiseaseEval, DiseaseInfoNames, SymptomGroup, Valid, DiseaseInfoValue FROM ChosenSynonymsDiseases;";
  //public diseaseNames: String[] = [];
  //public chosenSymptoms: String[] = [];
  diseaseNames: Array<{ title: string, details: string, icon: string, showDetails: boolean }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.sqlite.create(this.options).then((db: SQLiteObject) => {
      db.executeSql(this.queryNames, {}).then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++)
          this.diseaseNames.push(
            {
              title: rows.item(i).DiseaseName,
              details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              icon: 'ios-add-circle-outline',
              showDetails: false
            }
          );
        console.log("ShowDiseases-Load: " + JSON.stringify(data));
      })
      //this.names.push(this.names.length.toString());

      this.tempmethod();

    });

    //this.navParams.get('chosenSymptoms');

    //Example passing Data through Pages
    //this.db = this.navParams.get('SQLiteObject');

  }

  tempmethod() {
    var end = new Date().getTime();
    var start = this.navParams.get('start');; 
    var dif = end - start;
    console.log("Time: " + dif);
    console.log("Start: " + start);
    console.log("End: " + end);
  }


  toggleDetails(diseaseNames) {
    if (diseaseNames.showDetails) {
      diseaseNames.showDetails = false;
      diseaseNames.icon = 'ios-add-circle-outline';
    } else {
      diseaseNames.showDetails = true;
      diseaseNames.icon = 'ios-remove-circle-outline';
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDiseasesPage');
  }



}

/*
class Disease {
  public DiseaseName;
  public DiseaseInfoValue;
  public SymptomGroup;
  public DiseaseInfoNames;
  public Valid;

  constructor(DiseaseName, DiseaseInfoNames, SymptomGroup, Valid, DiseaseInfoValue) {
    this.DiseaseName = DiseaseName;
    this.DiseaseInfoNames = DiseaseInfoNames;
    this.SymptomGroup = SymptomGroup;
    this.Valid = Valid;
    this.DiseaseInfoValue = DiseaseInfoValue;
  }
  

}

var temp = {
          DiseaseName: rows.item(i).DiseaseName,
          DiseaseInfoNames: rows.item(i).DiseaseInfoNames,
          SymptomGroup: rows.item(i).SymptomGroup,
          Valid: rows.item(i).Valid,
          DiseaseInfoValue: rows.item(i).DiseaseInfoValue,
          DiseaseEval: rows.item(i).DiseaseEval


*/

