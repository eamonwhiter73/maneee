import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer, OnDestroy } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserProfile } from '../../pages/userprofile/userprofile';
import { FormulasPage } from '../../pages/formulas/formulas';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';
import dropin from 'braintree-web-drop-in';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as braintree from 'braintree-web';






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
  data = {'color':''};
  keyy;
  body;
  folder1;
  folder2;
  list: FirebaseListObservable<any>;
  list2: FirebaseObjectObservable<any>;
  items = [];
  payload;
  key;



 constructor(public storage: Storage, public http: Http, public af: AngularFireDatabase, public appCtrl: App, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   
 }

 ionViewDidLoad() {
   this.username = this.params.get('username');
   this.square = this.params.get('square');
   this.payload = this.params.get('payload');
   this.key = this.params.get('key');

   this.storage.get('username').then((val) => {
     this.usernameowner = val;

      this.list2 = this.af.object('/formulasowned/' + this.usernameowner);
      this.subscription = this.list2.subscribe(item => {
        console.log(JSON.stringify(item) + "     objh objjo   obono oonnono ");
        for(let z in item) {
          console.log(z + " zzzzzzzzzzzzzzzzz");
          this.items.push(z);
        }
      })
   })

  
   
   if(this.key == null) {

     let database = firebase.database();
     let bool = false;

     let self = this;

     let reff = firebase.database().ref('/formulas').orderByChild('username').equalTo(this.username).on("value", (snapshot) => {
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
   } 
   else {
     let database = firebase.database();
     let bool = false;

     let self = this;

     let reff = firebase.database().ref('/formulas').orderByKey().equalTo(this.key).on("value", (snapshot) => {
        snapshot.forEach(snapshot => {
            // key
            let key = snapshot.key;
            console.log("key: " + key);
            // value, could be object
            let childData = snapshot.val();
            console.log("data: " + JSON.stringify(childData));
            // Do what you want with these key/values here

            self.data = childData;
            
            return true;
        });
    });
   }



  //this.buy();

 	//this.renderer.appendText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.appendText(this.time.nativeElement, this.params.get('time'));
 }

 buy() {
   let reff = firebase.database().ref('/profiles/stylists').orderByChild('username').equalTo(this.username).on("value", (snapshot) => {
      snapshot.forEach(snapshot => {
          // key
          let key = snapshot.key;
          console.log("key: " + key);
          // value, could be object
          let childData = snapshot.val();
          console.log("data: " + JSON.stringify(childData));
          // Do what you want with these key/values here

          this.payload.merchantid = childData.merchantid;
          this.payload.publickey = childData.publickey;
          this.payload.privatekey = childData.privatekey;

          if(this.folder1 == '' && this.folder2 == '') {
           alert("You must select or create a folder for the formula.")
          }
          else {
           if(this.folder1 != null && this.folder2 == null) {
             this.list = this.af.list('/formulasowned/'+ this.usernameowner + '/'+ this.folder1);
              this.data.color = this.folder1;
           }
           else {
             this.list = this.af.list('/formulasowned/'+ this.usernameowner + '/'+ this.folder2);
             this.data.color = this.folder2;
           }
           
           console.log(this.payload + '          paaaaayyyyyylllllooooooaaaaaddddd');

            let headers = new Headers({
              'Content-Type': 'application/json'
            });
            let options = new RequestOptions({
              headers: headers
            });
            // TODO: Encode the values using encodeURIComponent().
            let body = JSON.stringify(this.payload);

           //INSERT CALL TO BACKEND
           this.http.post('http://192.168.1.131:8888/api/buyformula.php', body)  
           .subscribe(res => {
             console.log(res + "response from formula buy");
             console.log(JSON.stringify(this.data) + "     data dat d dat add  dat");
             this.list.push(this.data);

             alert("You bought a formula! Check the settings page to view it.");
             this.dismiss();
           }, err => {
             console.log(JSON.stringify(err))
           });

     
   }
          
          return true;
      });
  });
 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

 ngOnDestroy() {
   if(this.subscription != null) {
     this.subscription.unsubscribe();
   }
 }

}