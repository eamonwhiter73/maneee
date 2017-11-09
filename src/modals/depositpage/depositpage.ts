import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer, OnDestroy } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserProfile } from '../../pages/userprofile/userprofile';
import { FormulasPage } from '../../pages/formulas/formulas';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";
import firebase from 'firebase';
import dropin from 'braintree-web-drop-in';
import { HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as braintree from 'braintree-web';






@Component({
	selector: 'deposit-page',
  templateUrl: 'depositpage.html'
})
export class DepositPage implements OnDestroy {
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
  deposit;



 constructor(public storage: Storage, public http: Http, public af: AngularFireDatabase, public appCtrl: App, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   
 }

 ionViewDidLoad() {
  this.payload = this.params.get('payload');


 	//this.renderer.appendText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.appendText(this.time.nativeElement, this.params.get('time'));
 }

 buy() {
   if(this.deposit == '' || isNaN(parseInt(this.deposit)) ) {
     alert("You must fill in an amount to deposit.")
   }
   else {  
     console.log(this.payload + '          paaaaayyyyyylllllooooooaaaaaddddd');
      let params = new URLSearchParams();
      params.set('deposit', this.deposit);

      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      });
      let options = new RequestOptions({
        headers: headers,
        params: params
      });
      // TODO: Encode the values using encodeURIComponent().
      this.payload['deposit'] = this.deposit;
      let body = JSON.stringify(this.payload);

     //INSERT CALL TO BACKEND
     this.http.post('http://192.168.1.131:8888/api/deposit.php', body)  
     .subscribe(res => {
       alert("Your deposit was successful.");
       this.dismiss();
     }, err => {
       alert("Something went wrong.");
     });

     
   }
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