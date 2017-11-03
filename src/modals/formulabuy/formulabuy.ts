import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { UserProfile } from '../../pages/userprofile/userprofile';
import { FormulasPage } from '../../pages/formulas/formulas';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';
import * as braintree from 'braintree-web';
import dropin from 'braintree-web-drop-in';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';






@Component({
	selector: 'formula-buy',
  templateUrl: 'formulabuy.html'
})
export class FormulaBuy implements OnDestroy {
  //@ViewChild('salon') salon: ElementRef;
  //@ViewChild('time') time: ElementRef;
  username;
  usernameowner;
  square;
  formulas;
  subscription: ISubscription;
  data = {};
  keyy;
  body;
  folder1;
  folder2;
  list: FirebaseListObservable<any>;
  items = [];



 constructor(public storage: Storage, public http: Http, public af: AngularFireDatabase, public appCtrl: App, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   
 }

 ionViewDidLoad() {
   this.username = this.params.get('username');
   this.square = this.params.get('square');

   this.storage.get('username').then((val) => {
     this.usernameowner = val;
   })



   

   let database = firebase.database();
   let bool = false;

   let self = this;

   let reff = firebase.database().ref('/formulas').orderByChild('username').equalTo(this.username).on("value", function(snapshot) {
      snapshot.forEach(snapshot => {
          // key
          let key = snapshot.key;
          console.log("key: " + key);
          // value, could be object
          let childData = snapshot.val();
          console.log("data: " + JSON.stringify(childData));
          // Do what you want with these key/values here

          if(self.square == childData.square) {
            self.data = childData;
          }
          
          return true;
      });
  });

  //this.buy();

 	//this.renderer.appendText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.appendText(this.time.nativeElement, this.params.get('time'));
 }

 buy() {
   if(this.folder1 == '' && this.folder2 == '') {
     alert("You must select or create a folder for the formula.")
   }
   else {
     if(this.folder1 != '' && this.folder2 == '') {
       this.list = this.af.list('/formulasowned/'+ this.usernameowner + '/'+ this.folder1);
     }
     else {
       this.list = this.af.list('/formulasowned/'+ this.usernameowner + '/'+ this.folder2);
     }
     this.list.push(this.data);
     alert("You bought a formula! Check the settings page to view it.");
     this.dismiss();
   }
 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

 ngOnDestroy() {
   
 }

}