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
  public diseaseNames: String[] = [];
  public chosenSymptoms: String[] = [];
  public randomText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
  //public diseases = [];

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

