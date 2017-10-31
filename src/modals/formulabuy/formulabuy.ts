import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { UserProfile } from '../../pages/userprofile/userprofile';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';
import braintree from 'braintree-web'





@Component({
	selector: 'formula-buy',
  templateUrl: 'formulabuy.html'
})
export class FormulaBuy implements OnDestroy {
  //@ViewChild('salon') salon: ElementRef;
  //@ViewChild('time') time: ElementRef;
  username;
  square;
  formulas;
  subscription: ISubscription;
  data = {};



 constructor(public http: Http, public af: AngularFireDatabase, public appCtrl: App, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   
 }

 ionViewDidLoad() {
   this.username = this.params.get('username');
   this.square = this.params.get('square');

   this.http.request('http://192.168.1.131:8888/generatetoken.php')
    .subscribe(res => { 
      braintree.client.create({ 
      authorization: res.text()},
      (err, client) => {
            // Do stuff here
            console.log(client + "    clieeeennntt");
            console.log(err + "   errrrrrrrr");
      });}, err => { console.log(err + "   where is string?")})

   

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

 	//this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.setText(this.time.nativeElement, this.params.get('time'));
 }

 buy() {

 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

 ngOnDestroy() {
   
 }

}