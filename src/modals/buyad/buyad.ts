import { App, NavParams, ViewController, NavController } from 'ionic-angular';
import { Component, Renderer, OnDestroy } from '@angular/core';
import { UserProfile } from '../../pages/userprofile/userprofile';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ISubscription } from "rxjs/Subscription";
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';





@Component({
	selector: 'buy-ad',
  templateUrl: 'buyad.html'
})
export class BuyAd {
  //@ViewChild('salon') salon: ElementRef;
  //@ViewChild('time') time: ElementRef;
  //info = {'salon':'','time':''};
  //userdata: FirebaseObjectObservable<any>;
  //userdata2: FirebaseObjectObservable<any>;
  //subscription: ISubscription;
  //subscription2: ISubscription;
  //phone: string;


 constructor(private sms: SMS, private callNumber: CallNumber, public af: AngularFireDatabase, public appCtrl: App, public navCtrl: NavController, public params: NavParams, public viewCtrl:ViewController, public renderer: Renderer) {
   
 }

 ionViewDidLoad() {
   //this.info.salon = this.params.get('salon');
   //this.info.time = this.params.get('time');
   

   //this.userdata = this.af.object('/profiles/stylists/' + this.info.salon);
    //this.subscription = this.userdata.subscribe(item => {
      //this.phone = item.phone;
    //});
 	  
 	//this.renderer.setText(this.salon.nativeElement, "@"+this.params.get('salon'));
 	//this.renderer.setText(this.time.nativeElement, this.params.get('time'));
 }

 dismiss() {
 	this.viewCtrl.dismiss();
 }

 smsFromPopup() {
  //if(this.phone.toString().length < 11) {
    this.sms.send("18608491429", 'Hi, I would like to talk about buying an ad!');

 }

 callFromPopup() {
     this.callNumber.callNumber("18608491429", true)
        .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
 }

 /*viewProfile() {

  this.dismiss();
  this.appCtrl.getRootNav().push(UserProfile, {
      username: this.info.salon
  })
 	
 }*/

 /*ngOnDestroy() {
   if(this.subscription != null) {
     this.subscription.unsubscribe();
   }
   if(this.subscription2 != null) {
     this.subscription2.unsubscribe();
   }
 }*/

}